from django.db import models
from uuid import uuid4
from member.models import Member
from trainer.models import Trainer

class Attendance(models.Model):
    class TypeChoices(models.TextChoices):
        MEMBER = "member"
        TRAINER = "trainer"
    
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name="attendance", null=True, blank=True)
    trainer = models.ForeignKey(Trainer, on_delete=models.CASCADE, related_name="attendance", null=True, blank=True)
    type = models.CharField(choices=TypeChoices.choices, default=TypeChoices.MEMBER)
    date = models.DateField(auto_now_add=True)