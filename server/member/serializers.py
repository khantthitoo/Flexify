from rest_framework import serializers
from .models import Member
from attendance.models import Attendance
from datetime import date

class MemberSerializer(serializers.ModelSerializer):
    checked_in = serializers.SerializerMethodField(read_only=True)
    
    def get_checked_in(self, obj):
        if Attendance.objects.filter(member=obj, date=date.today()):
            return True
        
        if obj.status != Member.StatusChoices.ACTIVE:
            return True
        
        return False
    
    class Meta:
        model = Member
        fields = ['id', 'name', 'ph_number', 'profile_image', 'days_left', 'status', 'end_date', 'checked_in', 'joined_at']
        read_only_fields = ['days_left', 'status', 'end_date']
        
