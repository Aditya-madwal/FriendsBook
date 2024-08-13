# for JWT token auth :
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('chatsample', views.sampleview.as_view(), name="sampleee"),
    path('fetchmessages/<slug:connection_uid>', views.Messages.as_view(), name="get-messages"),
    path('sendmessage', views.Messages.as_view(), name="send-message")
]