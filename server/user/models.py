from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    full_name = models.CharField(max_length=250, blank=True, null=True)
    ph_number = models.CharField(max_length=12, blank=True, null=True)
    joined_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.username