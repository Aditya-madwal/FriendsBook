from django.shortcuts import render
from rest_framework import status

# Create your views here.
from .models import Notes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import CustomUser
from .serializers import NoteSerializer

class showdetails(APIView) :
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request) :
        fn = request.user.username
        notes = Notes.objects.filter(user = request.user)
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request) :
        user = self.request.user
        note = request.data["note"]
        new_note = Notes.objects.create(user = user, note = note)
        note = NoteSerializer(new_note, many=False)
        return Response(note.data)