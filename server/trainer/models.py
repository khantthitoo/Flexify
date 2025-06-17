from django.db import models
from uuid import uuid4

class Trainer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=150)
    ph_number = models.CharField(max_length=12)
    age = models.IntegerField()
    profile_image = models.ImageField(upload_to="profiles/", null=True, blank=True)
    joined_date = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.name