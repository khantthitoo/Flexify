from django.core.management.base import BaseCommand
from datetime import date
from member.models import Member

class Command(BaseCommand):
    help = "Update Members status, days_left"
    
    def handle(self, *args, **options):
        print("[CRON] Running update_members at:", date.today())
        members = Member.objects.all()
        for member in members:
            member.days_left = max(member.days_left - 1, 0)
            if member.days_left == 0 and member.status == "active":
                member.status = Member.StatusChoices.EXPIRED
            member.save()
        