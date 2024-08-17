from django.shortcuts import render
from rest_framework import status
from .logic import *
from django.db.models import Q
from django.conf import settings

# Create your views here.
from .models import *
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from django.http import HttpResponse

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import CustomUser
from .serializers import *

from chatapi.models import *
from chatapi.serializers import ConnectionSerializer

class showFriends(APIView) :
    def get(self, request, username) :
        user = CustomUser.objects.get(username = username)
        friends = Friend.objects.filter(Q(user = user))
        # frnd_list = {i.frnd for i in friends}
        serializer = FriendsSerializer(friends, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class suggestions(APIView) :
    def get(self, request) :
        u = self.request.user

        # fr_sender_values = FriendRequest.objects.values_list('sender', flat=True)
        # fr_reciever_values = FriendRequest.objects.values_list('reciever', flat=True)
        # frnd_values = Friend.objects.values_list('frnd', flat=True)
        # frnd_user_values = Friend.objects.values_list('user', flat=True)

        fr_where_user_sender = FriendRequest.objects.filter(sender = u, is_accepted = False)
        fr_where_user_reciever = FriendRequest.objects.filter(reciever = u, is_accepted = False)
        f_where_user = Friend.objects.filter(user = u)

        l1 = fr_where_user_sender.values_list('reciever', flat=True)
        l2 = fr_where_user_reciever.values_list('sender', flat=True)
        l3 = f_where_user.values_list('frnd', flat=True)

        avoid = list(l1) + list(l2) + list(l3)

        suggestions_list = CustomUser.objects.exclude(id__in=avoid)
        # deletethis_suggestions_list = CustomUser.objects.all()
        # print(len(suggestions_list))

        serializer = UserSerializer(suggestions_list, many=True)
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
        sent = FriendRequest.objects.filter(sender = request.user, is_accepted=False)
        recieved = FriendRequest.objects.filter(reciever = request.user, is_accepted=False)

        serializer1 = FriendRequestSerializer(sent, many=True)
        serializer2 = FriendRequestSerializer(recieved, many=True)

        data = {
            "sent_requests" : serializer1.data,
            "recieved_requests" : serializer2.data
        }
        
        return Response(data, status=status.HTTP_200_OK)

class ShowPosts(APIView) :
    def get(self,request,category) :
        if category == "feed" :
            posts = Post.objects.all().order_by('-posted_on')
            serializer = PostSerializer_show(posts, many=True,context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        else :
            try:
                user = CustomUser.objects.get(username = category)
            except user.DoesNotExist:
                raise NotFound(detail="Object not found")
            posts = Post.objects.filter(user = user).order_by('-posted_on')
            serializer = PostSerializer_show(posts, many=True,context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)

class SearchResults(APIView) :
    def post(self,request) :
        query = request.data['query']
        posts = Post.objects.filter(Q(title__contains=query) | Q(desc__contains=query))
        people = CustomUser.objects.filter(Q(first_name__contains=query) | Q(last_name__contains=query) | Q(username__contains=query) | Q(bio__contains=query))

        serializer1 = UserSerializer(people, many=True)
        serializer2 = PostSerializer_show(posts, many = True, context={'request': request})

        data = {
            "people" : serializer1.data,
            "posts" : serializer2.data
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
        old_request.delete()
        if response == "yes" :
            # accept the request
            connection_uid = generate_uuid7()
            Connection.objects.create(user1 = sender, user2 = reciever, uid = connection_uid)
            Friend.objects.create(user = sender,frnd = reciever, connection_uid = connection_uid)
            Friend.objects.create(user = reciever,frnd = sender, connection_uid = connection_uid)
            pass
        else :
            old_request.delete()
        old_request.save()
        return Response("friend request updated")
    
    def delete(self, request, username) :
        #delete a friend
        sender = self.request.user
        reciever = CustomUser.objects.get(username = username)

        f1 = Friend.objects.get(user = sender, frnd = reciever)
        Friend.objects.get(user = sender, frnd = reciever).delete()
        Friend.objects.get(user = reciever, frnd = sender).delete()

        Connection.objects.get(uid = f1.connection_uid).delete()

        return Response("friend connection deleted")

class Fetch_Connection(APIView) :
    def get(self, request, uid) :
        connection = Connection.objects.get(uid = uid)
        serializer = ConnectionSerializer(connection, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

class Post_operations(APIView) :
    def post(self, request) :
        data = request.data.copy()
        serializer = PostSerializer(data = data)
        # print(self.new_post)

        if serializer.is_valid() :
            serializer.save(user = self.request.user, uid = generate_uuid7())
        else :
            return Response({'some errors':serializer.errors})

        return Response(serializer.data)

    def delete(self, request, uid) :
        post = Post.objects.get(uid = uid)
        post.delete()
        serializer = PostSerializer(post, many=False)
        return Response({"deleted post" : serializer.data})

class EmailVerification(APIView) :
    OTP = None

    def get(self, request) :
        user_email = self.request.user.email
        self.OTP = generate_otp()
        try :
            emailstatus = send_mail(
                "email verification",
                f"Your OTP to verify email in FriendsBook is {self.OTP}, dont share with any one",
                settings.EMAIL_HOST_USER,
                [user_email],
                fail_silently=False,
            )
            try:
                already_exists = Otp.objects.filter(email=user_email).exists()
                if Otp.objects.filter(email=user_email).exists() :
                    x = Otp.objects.get(email=user_email)
                    x.otp = str(self.OTP)
                    x.save()
                else :
                    Otp.objects.create(email = user_email, otp = str(self.OTP))
            except Exception as e :
                print(e)

        except :
            return Response("error")
        return Response("success")
    
    def post(self, request) :
        user_email = self.request.user.email
        recieved_otp = str(request.data["otp"])
        print("===============")
        print(user_email)
        print(request.data)
        print("===============")
        actual_otp = None
        try :
            x = Otp.objects.get(email = user_email)
            actual_otp = str(x.otp)
        except :
            return Response("otp request not found, first get email verification otp.")

        check = True if recieved_otp==actual_otp else False

        if check :
            user = CustomUser.objects.get(email = user_email)
            user.verified = True
            # Otp.objects.get(email = user_email).delete()
            user.save()
            return Response({"status" : "verified"})
        else :
            return Response(f"some error occured")


class Comment_operations(APIView) :
    def get(self, request, post_uid) :
        # get comments of a post
        post = Post.objects.get(uid = post_uid)
        comments = Comment.objects.filter(post = post)
        serializer = CommentShowSerializer(comments, many=True)
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
        serializer = CommentAddSerializer(data = data, many=False)

        if not serializer.is_valid() :
            return Response({'errors':serializer.errors})
        serializer.save()
        
        return Response({"created comment":serializer.data}, status=status.HTTP_200_OK)

    def delete(self, request, uid) :
        comment = Comment.objects.get(uid = uid)
        post = comment.post
        post.comments -= 1
        post.save()
        serializer = CommentShowSerializer(comment, many=False)
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
