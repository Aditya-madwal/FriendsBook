from rest_framework import serializers
from .models import *
from users.models import *

class UserSerializer(serializers.ModelSerializer) :
    class Meta:
        model = CustomUser
        fields = ["id","username","email","pfp","bio","first_name", "last_name","verified"]
    
    def get_image(self, obj):
        if obj.image:
            return obj.image.name
        return None

class ConnectionSerializer(serializers.ModelSerializer) :
    user1 = UserSerializer(read_only = True)
    user2 = UserSerializer(read_only = True)

    class Meta :
        model = Connection
        fields = "__all__"


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only = True)
    connection = ConnectionSerializer(read_only = True)
    class Meta:
        model = Message
        fields = "__all__"
