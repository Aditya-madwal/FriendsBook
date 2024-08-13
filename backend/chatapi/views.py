from django.shortcuts import render
from rest_framework import status
from django.db.models import Q
from django.conf import settings
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from django.http import HttpResponse

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

from users.models import CustomUser
from .models import *
from .serializers import *


class sampleview(APIView) :
    def get(self, request) :
        Messages = Message.objects.all()
        serializer = MessageSerializer(Messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class Messages(APIView) :
    def get(self, request, connection_uid) :
        # fetch messages
        connection = Connection.objects.get(uid = connection_uid)
        messages = Message.objects.filter(connection = connection)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request) :
        # create a new message
        msg_text = request.data['content']
        msg_connection = request.data['connection_uid']
        connection = Connection.objects.get(uid = msg_connection)
        sender = self.request.user
        if request.data['image'] :
            image = request.data['image']
            Message.objects.create(content = msg_text, connection = connection, sender = sender, image = image)
        else :
            Message.objects.create(content = msg_text, connection = connection, sender = sender)
        return Response("message object created")