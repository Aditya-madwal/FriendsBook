from django.db import models
from users.models import CustomUser


# Create your models here.

class Friend(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="user")
    frnd = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="friend")

    def __str__(self):
        return f"{self.user}-->{self.frnd}"

class FriendRequest(models.Model) :
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="sender")
    reciever = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="reciever")
    is_accepted = models.BooleanField(default=False)
    sent_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.sender}-->{self.reciever} ({self.is_accepted})"

class Post(models.Model) :
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    uid = models.CharField(max_length = 7, unique=True, blank=True, null=True)
    title = models.CharField(max_length=50)
    desc = models.TextField(max_length=200, blank=True, null=True)
    image = models.ImageField(default=None, blank=True, null=True, upload_to="posts")
    likes = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)
    posted_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Comment(models.Model) :
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    uid = models.CharField(max_length = 7, unique=True, blank=True, null=True)
    content = models.CharField(max_length=100)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content

class Like(models.Model) :
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user}-->{self.post}"