"""
author : Nakagaki Yuto
"""

from django.test import TestCase
from animar.models import User, Type
import datetime

# ok

class RegisterAnimalTest(TestCase):
    """
    author : Nakagaki Yuto
    date   : 2020/09/23
    """

    # 何も登録しなければレコードの数は0個
    def test_is_empty(self):
        saved_animals = User.objects.filter(name__isnull=False)
        self.assertEqual(saved_animals.count(), 0)

    # 1つデータを登録すればレコードの数は1個
    def test_is_not_empty(self):
        type = Type(name='cat')
        type.save()
        user = User(user_id='testuser', mail='test@gmail.com', name='test_animal', image='', sex=1, type=Type.objects.get(id=1), birthday='2020-09-23', residence='test_residence', profile='test_profile')
        user.set_password('testpassword')
        user.save()
        saved_animals = User.objects.filter(name__isnull=False)
        self.assertEqual(saved_animals.count(), 1)

    # データを正しく持っているか
    def test_saving_and_retrieving_human(self):
        type = Type(name='cat')
        type.save()
        user = User(user_id='testuser', mail='test@gmail.com', name='test_animal', image='', sex=1, type=Type.objects.get(id=1), birthday='2020-09-23', residence='test_residence', profile='test_profile')
        user.set_password('testpassword')
        user.save()
        saved_users = User.objects.filter(name__isnull=False)
        actual_user = saved_users[0]
        self.assertEqual(actual_user.user_id, 'testuser')
        self.assertEqual(actual_user.mail, 'test@gmail.com')
        self.assertEqual(actual_user.check_password('testpassword'), True)
        self.assertEqual(actual_user.image, '')
        self.assertEqual(actual_user.sex, 1)
        self.assertEqual(actual_user.type, Type.objects.get(id=1))
        self.assertEqual(actual_user.birthday, datetime.date(2020, 9, 23))
        self.assertEqual(actual_user.residence, 'test_residence')
        self.assertEqual(actual_user.profile, 'test_profile')
