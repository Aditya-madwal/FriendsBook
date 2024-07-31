from django.db import models
from users.models import CustomUser

# Create your models here.

class Notes(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    note = models.CharField(max_length=50)
    
    def __str__(self):
        return self.note
