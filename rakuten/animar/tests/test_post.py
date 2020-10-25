"""
author : Nakagaki Yuto
"""

from django.test import TestCase
from animar.models import Post, User

# ok

class PostTest(TestCase):
    """
    author : Nakagaki Yuto
    date   : 2020/09/23
    """

    # 何も登録しなければレコードの数は0個
    def test_is_empty(self):
        saved_posts = Post.objects.all()
        self.assertEqual(saved_posts.count(), 0)

    # 1つデータを登録すればレコードの数は1個
    def test_is_not_empty(self):
        user = User(user_id='testuser', mail='test@gmail.com')
        user.set_password('testpassword')
        user.save()
        post = Post(user_id=User.objects.get(id=1), image='', content='test_content')
        post.save()
        saved_posts = Post.objects.all()
        self.assertEqual(saved_posts.count(), 1)

    # データを正しく持っているか
    def test_saving_and_retrieving_like(self):
        user = User(user_id='testuser', mail='test@gmail.com')
        user.set_password('testpassword')
        user.save()
        post = Post(user_id=User.objects.get(id=1), image='', content='test_content')
        post.save()
        saved_posts = Post.objects.all()
        actual_post = saved_posts[0]

        self.assertEqual(actual_post.user_id, User.objects.get(id=1))
        self.assertEqual(actual_post.image, '')
        self.assertEqual(actual_post.content, 'test_content')


