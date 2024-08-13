from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    # path('details', views.showdetails.as_view(), name="details"),
    path('friendops/<slug:username>', views.Friend_operations.as_view(), name="frnd_ops"),
    path('showfriends/<slug:username>', views.showFriends.as_view(), name="showfriends"),
    path('showuser/<slug:username>', views.UserInfo.as_view(), name="userinfo"),
    path('deletepost/<slug:uid>', views.Post_operations.as_view(), name="post-delete"),
    path('addpost', views.Post_operations.as_view(), name="post-add"),
    path('showcomments/<slug:post_uid>', views.Comment_operations.as_view(), name="comments-show"),
    path('addcomment', views.Comment_operations.as_view(), name="comments-add"),
    path('deletecomment/<slug:uid>', views.Comment_operations.as_view(), name="comments-delete"),
    path('like/<slug:post_uid>', views.Like_operations.as_view(), name="unlike/showlike"),
    path('like', views.Like_operations.as_view(), name="like"),
    path('showfriendrequests', views.ShowAllFriendRequests.as_view(), name="FRs"),
    path('showme', views.showMe.as_view(), name="myinfo"),
    path('suggestions', views.suggestions.as_view(), name="suggestions"),
    path('search', views.SearchResults.as_view(), name="search"),
    path('showposts/<slug:category>', views.ShowPosts.as_view(), name="feed"),
    path('verifymyemail',views.EmailVerification.as_view(), name="get email otp"),
]