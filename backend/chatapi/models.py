from django.db import models
from users.models import CustomUser

# Create your models here.

class Message(models.Model) :
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="msg_sender")
    connection = models.ForeignKey("chatapi.Connection", on_delete=models.CASCADE, related_name="connection")
    content = models.TextField(max_length=200)
    image = models.ImageField(upload_to='messages', default="", blank=True, null=True)
    sent_on = models.DateTimeField(auto_now_add=True)
    is_seen = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.sender} --> {self.connection.uid} : {self.content}"

class Connection(models.Model) :
    uid = models.CharField(max_length=7)
    user1 = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="user1")
    user2 = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="user2")

    def __str__(self):
        return f"{self.user1} <--> {self.user2} : {self.uid}"