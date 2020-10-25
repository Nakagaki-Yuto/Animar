from django.contrib import admin

from .models import User, Type, Like, Post


class UserView(admin.ModelAdmin):
    fields = ('mail', 'user_id', 'password', 'name', 'image', 'sex', 'type', 'birthday', 'residence', 'profile', 'created_at', 'is_staff', 'is_superuser', )
    list_display = ('mail', 'user_id', 'password', 'name', 'image', 'sex', 'type', 'birthday', 'residence', 'profile', 'created_at', 'is_staff', 'is_superuser', )

class TypeView(admin.ModelAdmin):
    fields = ('name', )
    list_display = ('name',)

class LikeView(admin.ModelAdmin):
    fields = ('post_id', 'user_id', )
    list_display = ('post_id', 'user_id', )

class PostView(admin.ModelAdmin):
    fields = ('user_id', 'image', 'content', )
    list_display = ('user_id', 'image', 'content', )


admin.site.register(User, UserView)
admin.site.register(Type, TypeView)
admin.site.register(Like, LikeView)
admin.site.register(Post, PostView)
