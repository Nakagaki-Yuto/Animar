"""
author : Nakagaki Yuto
"""

from django.test import TestCase
from animar.models import User

# ok

class RegisterHumanTest(TestCase):
    """
    author : Nakagaki Yuto
    date   : 2020/09/23
    """

    # 何も登録しなければレコードの数は0個
    def test_is_empty(self):
        saved_humans = User.objects.filter(name__isnull=True)
        self.assertEqual(saved_humans.count(), 0)

    # 1つデータを登録すればレコードの数は1個
    def test_is_not_empty(self):
        user = User(user_id='testuser', mail='test@gmail.com')
        user.set_password('testpassword')
        user.save()
        saved_users = User.objects.filter(name__isnull=True)
        self.assertEqual(saved_users.count(), 1)

    # データを正しく持っているか
    def test_saving_and_retrieving_human(self):
        user = User(user_id='testuser', mail='test@gmail.com')
        user.set_password('testpassword')
        user.save()
        saved_users = User.objects.filter(name__isnull=True)
        actual_user = saved_users[0]
        self.assertEqual(actual_user.user_id, 'testuser')
        self.assertEqual(actual_user.mail, 'test@gmail.com')
        self.assertEqual(actual_user.check_password('testpassword'), True)

