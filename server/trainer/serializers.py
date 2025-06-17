from rest_framework import serializers
from .models import Trainer
from attendance.serializers import Attendance
from datetime import date

class TrainerSerializer(serializers.ModelSerializer):
    checked_in = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Trainer
        fields = ['id', 'name', 'ph_number', 'age', 'profile_image', 'checked_in', 'joined_date']
        
    def get_checked_in(self, obj):
        if Attendance.objects.filter(trainer=obj, date=date.today()):
            return True
        return False