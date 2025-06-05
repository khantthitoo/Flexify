from django.db import models
from uuid import uuid4

class Member(models.Model):
    class StatusChoices(models.TextChoices):
        ACTIVE = "active"
        INACTIVE = "inactive"
        EXPIRED = "expired"
    
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=150)
    ph_number = models.CharField(max_length=20)
    profile_image = models.ImageField(upload_to="profiles/", null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=StatusChoices.choices, default=StatusChoices.INACTIVE)
    time_left = models.IntegerField(default=0)
    joined_at = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.name