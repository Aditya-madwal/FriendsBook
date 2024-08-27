import json
from .models import *
from users.models import CustomUser
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import *
from .serializers import *
import base64
from django.core.files.base import ContentFile


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_code = self.scope['url_route']['kwargs']['connection_uid']
        self.room_group_name = f'chat_{self.room_code}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        print("CONNECTED TO ------> "+ self.room_code)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data = None):

        data = json.loads(text_data)
        sender_username = data.get('username')
        image_data = data.get('image')
        text = data.get('content')
        sender_username = data.get('username')
        image_file = None

        if image_data:
            format, imgstr = image_data.split(';base64,')
            ext = format.split('/')[-1]
            image_file = ContentFile(base64.b64decode(imgstr), name=f'{sender_username}_{self.channel_name}.{ext}')
            print(image_file)
        else:
            image_file = None
        
        serialized_msg_object = await self.save_message(text=text, image_data=image_file, sender_username=sender_username)
        

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': {
                    'message_data' : serialized_msg_object,
                }
            }
        )

    async def chat_message(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps(event['message']))

    @sync_to_async
    def save_message(self, text, image_data, sender_username):
        # sender = request.user
        sender =CustomUser.objects.get(username = sender_username)

        print({
            "connection" : Connection.objects.get(uid = self.room_code),
            "sender": sender,
            "content":text,
        })

        message = Message.objects.create(
            connection = Connection.objects.get(uid = self.room_code),
            sender= sender,
            content=text,
            image = None if not image_data else image_data
        )


        message.save()

        serialized_new_message = MessageSerializer(message, many=False)

        return serialized_new_message.data