from rest_framework import serializers
from .models import Attendance

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ['id', 'member', 'type', 'date']
        read_only_fields = ['member']
        
    def validate(self, attrs):
        if not attrs.get('member') and not attrs.get('trainer'):
            raise serializers.ValidationError("At least one of member or trainer must be provided")
        
        return attrs