from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer) :
    class Meta:
        model = CustomUser
        fields = ["id","username","email","pfp","bio","first_name", "last_name","verified"]
    
    def get_image(self, obj):
        if obj.image:
            return obj.image.name  # This ensures the relative path is returned
        return None

class FriendsSerializer(serializers.ModelSerializer):
    frnd = UserSerializer(read_only=True)

    class Meta:
        model = Friend
        fields = ['frnd', 'connection_uid']

class FriendRequestSerializer(serializers.ModelSerializer) :
    sender = UserSerializer(read_only=True)
    reciever = UserSerializer(read_only = True)
    class Meta:
        model = FriendRequest
        fields='__all__'

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Post
        fields = ["user", "uid", "title", "desc", "image", "posted_on", "likes", "comments"]
    
    def get_image(self, obj):
        if obj.image:
            return obj.image.name  # This ensures the relative path is returned
        return None

class PostSerializer_show(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    is_liked_by_user = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ["user", "uid", "title", "desc", "image", "posted_on", "likes", "comments", "is_liked_by_user"]
    
    def get_is_liked_by_user(self, obj):
        liker = self.context['request'].user
        if liker.is_authenticated:
            return Like.objects.filter(user=liker, post=obj).exists()
        return False
    
    def get_image(self, obj):
        if obj.image:
            return obj.image.name  # This ensures the relative path is returned
        return None

class CommentShowSerializer(serializers.ModelSerializer) :
    user = UserSerializer(read_only=True)
    post = PostSerializer(read_only = True)
    class Meta :
        model = Comment
        fields = ["user", "uid" , "post", "content", "time"]

class CommentAddSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Comment
        fields = ["user", "uid" , "post", "content", "time"]

class LikeSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Like
        fields = ["user", "post", "time"]