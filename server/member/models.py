from django.db import models
from uuid import uuid4
from datetime import timedelta, date
from django.core.exceptions import ValidationError

membership_days = {
    "one": 30,
    "three": 90,
    "twelve": 365
}

class Member(models.Model):
    class StatusChoices(models.TextChoices):
        ACTIVE = "active"
        INACTIVE = "inactive"
        EXPIRED = "expired"
    
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=150)
    ph_number = models.CharField(max_length=20)
    profile_image = models.ImageField(upload_to="profiles/", null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=StatusChoices.choices, default=StatusChoices.INACTIVE)
    days_left = models.IntegerField(default=0)
    joined_at = models.DateField(auto_now_add=True)
    
    def activate_membership(self, membership_type):
        types = membership_days.keys()
        if membership_type in types:
            self.end_date = date.today() + timedelta(days=membership_days[membership_type] + self.days_left)
            self.status = self.StatusChoices.ACTIVE
            self.days_left = self.days_left + membership_days[membership_type]
        else:
            raise ValidationError("Membership type is not available")
            
        self.save()
    
    def __str__(self):
        return self.name
    
