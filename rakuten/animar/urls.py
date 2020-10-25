"""
Author : Takahiro Suzuki, Takumi Sato, Yuto Nakagaki, Takumi Katayama
Date : 2020/09/16 ~ 2020/09/25
Description : None
"""

from django.contrib import admin
from django.urls import path, include
from django.conf.urls import include, url
from rest_framework import routers
from .views import AuthRegisterHuman, AuthRegisterAnimal, GetAuthInfo, GetUserInfo, GetAllPost, GetFilteredPost, PostLike, PostAPI
from . import views

urlpatterns = [
    path('post/', PostAPI.as_view(), ),
    url(r'^register/human/$', AuthRegisterHuman.as_view()),
    url(r'^register/animal/$', AuthRegisterAnimal.as_view()),
    url(r'user/$', GetAuthInfo.as_view()),
    path('user/get/<str:user_id>/', GetUserInfo.as_view()),
    url(r'getpost/$', GetAllPost.as_view()),
    url(r'like/$', PostLike.as_view()),
    path('getpost/filter/<str:tname>/', GetFilteredPost.as_view()),
]
