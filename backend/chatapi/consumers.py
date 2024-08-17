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
        print("++++++++++++++++++")
        print(text_data)
        print(bytes_data)
        print("++++++++++++++++++")

        # data = json.loads(text_data)

        # text = data.get('content')
        # # image_data = data.get('image')

        # serialized_msg_object = await self.save_message(text = text, image_data=None, sender_username=sender_username)
        data = json.loads(text_data)
        sender_username = data.get('username')
        image_data = base64.b64encode(bytes_data).decode('utf-8') if bytes_data else None
        text = data.get('content')
        sender_username = data.get('username')
        # serialized_msg_object = await self.save_message(text=text, image_data=image_data, sender_username=sender_username)

        # if text_data:
        #     data = json.loads(text_data)
        #     text = data.get('content')
        #     sender_username = data.get('username')
        #     image_data = data.get('image')

        #     if image_data:
        #         # Handle base64 image data
        #         format, imgstr = image_data.split(';base64,') 
        #         ext = format.split('/')[-1]
        #         image_file = ContentFile(base64.b64decode(imgstr), name=f'image.{ext}')
        #     else :
        #         image_file = None
        image_file = None
        
        serialized_msg_object = await self.save_message(text=text, image_data=image_file, sender_username=sender_username)
        

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': {
                    # 'sender': sender,
                    # 'text': message_text,
                    # 'image_url': message.image.url if message.image else None,
                    # 'timestamp': message.timestamp.isoformat(),
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

        if image_data:
            # Decode and save the image
            format, imgstr = image_data.split(';base64,') 
            ext = format.split('/')[-1] 
            message.image.save(f'image_{message.id}.{ext}', ContentFile(base64.b64decode(imgstr)), save=True)

        message.save()

        serialized_new_message = MessageSerializer(message, many=False)

        return serialized_new_message.data