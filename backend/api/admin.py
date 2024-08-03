from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Friend)
admin.site.register(FriendRequest)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Like)