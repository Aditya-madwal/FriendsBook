from django.shortcuts import render
from rest_framework import status
from .logic import generate_uuid7
from django.db.models import Q

# Create your views here.
from .models import *
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import CustomUser
from .serializers import *

class showFriends(APIView) :
    def get(self, request, username) :
        user = CustomUser.objects.get(username = username)
        friends = Friend.objects.filter(Q(user = user))
        # frnd_list = {i.frnd for i in friends}
        serializer = FriendsSerializer(friends, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class showMe(APIView) :
    def get(self, request) :
        user = self.request.user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserInfo(APIView) :
    def get(self, request, username) :
        user = CustomUser.objects.get(username = username)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ShowAllFriendRequests(APIView) :
    def get(self,request) :
        sent = FriendRequest.objects.filter(sender = request.user)
        recieved = FriendRequest.objects.filter(reciever = request.user)

        serializer1 = FriendRequestSerializer(sent, many=True)
        serializer2 = FriendRequestSerializer(recieved, many=True)

        data = {
            "sent_requests" : serializer1.data,
            "recieved_requests" : serializer2.data
        }
        
        return Response(data, status=status.HTTP_200_OK)

class Friend_operations(APIView) :
    def get(self, request, username) :
        # while sending the friend request
        sender = self.request.user
        reciever = CustomUser.objects.get(username = username)
        new_request = FriendRequest.objects.create(sender = sender, reciever = reciever)
        return Response(f"request sent to {reciever.username}")
    
    def post(self, request, username) :
        # while answering to the friend request
        sender = self.request.user
        response = request.data["response"]
        reciever = CustomUser.objects.get(username = username)
        old_request = FriendRequest.objects.get(sender = reciever, reciever = sender)
        old_request.is_accepted = True if response=="yes" else False
        if response == "yes" :
            Friend.objects.create(user = sender,frnd = reciever)
            Friend.objects.create(user = reciever,frnd = sender)
        old_request.save()
        return Response("friend request updated")

class Post_operations(APIView) :
    def post(self, request) :
        data = request.data.copy()
        data['user'] = request.user.id
        data['uid'] = generate_uuid7()
        serializer = PostSerializer(data = data, many=False)
        
        if not serializer.is_valid() :
            return Response({'errors':serializer.errors})
        serializer.save()

        post = serializer.save()
        return Response(serializer.data)

    def delete(self, request, uid) :
        post = Post.objects.get(uid = uid)
        post.delete()
        serializer = PostSerializer(post, many=False)
        return Response({"deleted post" : serializer.data})

class Comment_operations(APIView) :
    def get(self, request, post_uid) :
        # get comments of a post
        post = Post.objects.get(uid = post_uid)
        comments = Comment.objects.filter(post = post)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request) :
        # create a new comment
        data = request.data.copy()
        data["user"] = self.request.user.id
        data["uid"] = generate_uuid7()
        pid = data["post"]
        
        post = Post.objects.get(uid = pid)
        post.comments += 1
        post.save()

        data["post"] = post.id
        serializer = CommentSerializer(data = data, many=False)

        if not serializer.is_valid() :
            return Response({'errors':serializer.errors})
        serializer.save()
        
        return Response({"created comment":serializer.data}, status=status.HTTP_200_OK)

    def delete(self, request, uid) :
        comment = Comment.objects.get(uid = uid)
        post = comment.post
        post.comments -= 1
        post.save()
        serializer = CommentSerializer(comment, many=False)
        comment.delete()
        return Response({"deleted comment" : serializer.data}, status=status.HTTP_200_OK)

class Like_operations(APIView) :
    def get(self, request, post_uid) :
        post = Post.objects.get(uid = post_uid)
        likes = Like.objects.filter(post = post)
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request) :
        # like a post
        post_uid = request.data["post_uid"]
        post = Post.objects.get(uid = post_uid)
        try :
            like = Like.objects.get(post = post, user=self.request.user)
            return Response("you have already liked this")
        except :
            post.likes += 1
            post.save()
            like = Like.objects.create(user = self.request.user, post = post)
            serializer = LikeSerializer(like, many=False)
            return Response({"liked" : serializer.data}, status=status.HTTP_200_OK)
    
    def delete(self, request, post_uid) :
        # delete a like
        post = Post.objects.get(uid = post_uid)
        like = Like.objects.get(post = post, user = request.user)
        post.likes -= 1
        post.save()
        like.delete()
        return Response(f"deleted like from post #{post.uid}")

