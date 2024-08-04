from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer) :
    class Meta:
        model = CustomUser
        fields = ["id","username","email","pfp","bio","first_name", "last_name","verified"]

class FriendsSerializer(serializers.ModelSerializer):
    frnd = UserSerializer(read_only=True)

    class Meta:
        model = Friend
        fields = ['frnd']

class FriendRequestSerializer(serializers.ModelSerializer) :
    sender = UserSerializer(read_only=True)
    reciever = UserSerializer(read_only = True)
    class Meta:
        model = FriendRequest
        fields='__all__'

class PostSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Post
        fields = ["user", "uid","title", "desc", "image"]

class CommentSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Comment
        fields = ["user", "uid" , "post", "content", "time"]

class LikeSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Like
        fields = ["user", "post", "time"]