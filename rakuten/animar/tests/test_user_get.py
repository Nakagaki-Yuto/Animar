"""
author : Nakagaki Yuto
"""

from django.test import TestCase
from animar.models import User, Type
from animar.views import GetUserInfo
from django.test import Client
# from rest_framework.test import APIRequestFactory

class GetUserInfoTest(TestCase):
    """
    author : Nakagaki Yuto
    date   : 2020/09/24
    """

    # Viewの動作をテスト
    def test_get_user_info_view(self):
        # Type, Userを登録
        type = Type(name='cat')
        type.save()
        user = User(user_id='testuser', mail='test@gmail.com', name='test_animal', image='', sex=1, type=Type.objects.get(id=1), birthday='2020-09-23', residence='test_residence', profile='test_profile')
        user.set_password('testpassword')
        user.save()

        # レスポンスのテスト
        c = Client()
        c.post('/login/', {'user_id': 'testuser', 'password': 'testpassword'})
        response = c.get('/api/user/get/testuser/')
        self.failUnlessEqual(response.status_code, 200)



