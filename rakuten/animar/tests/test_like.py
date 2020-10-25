"""
author : Nakagaki Yuto
"""

from django.test import TestCase
from animar.models import Like, Post, User
from animar.views import PostLike
from django.test import Client

# ok

class LikeTest(TestCase):
    """
    author : Nakagaki Yuto
    date   : 2020/09/23
    """

    # 何も登録しなければレコードの数は0個
    def test_is_empty(self):
        saved_likes = Like.objects.all()
        self.assertEqual(saved_likes.count(), 0)

    # 1つデータを登録すればレコードの数は1個
    def test_is_not_empty(self):
        user = User(user_id='testuser', mail='test@gmail.com')
        user.set_password('testpassword')
        user.save()
        post = Post(user_id=User.objects.get(id=1), image='', content='test')
        post.save()
        like = Like(post_id=Post.objects.get(id=1), user_id=User.objects.get(id=1))
        like.save()
        saved_likes = Like.objects.all()
        self.assertEqual(saved_likes.count(), 1)

    # データを正しく持っているか
    def test_saving_and_retrieving_like(self):
        user = User(user_id='testuser', mail='test@gmail.com')
        user.set_password('testpassword')
        user.save()
        post = Post(user_id=User.objects.get(id=1), image='', content='test')
        post.save()
        like = Like(post_id=Post.objects.get(id=1), user_id=User.objects.get(id=1))
        like.save()
        saved_likes = Like.objects.all()
        actual_like = saved_likes[0]

        self.assertEqual(actual_like.post_id, Post.objects.get(id=1))
        self.assertEqual(actual_like.user_id, User.objects.get(id=1))

    # Viewのテスト
    def test_view(self):

        # User, Post, Likeを登録
        user = User(user_id='testuser', mail='test@gmail.com')
        user.set_password('testpassword')
        user.save()
        post = Post(user_id=User.objects.get(id=1), image='', content='test')
        post.save()
        like = Like(post_id=Post.objects.get(id=1), user_id=User.objects.get(id=1))
        like.save()

        # レスポンスのテスト
        self.c = Client()
        response = self.c.delete('/api/like/', {'post_id' : 1, 'user_id' : 1})
        self.failUnlessEqual(response.status_code, 200)
    
