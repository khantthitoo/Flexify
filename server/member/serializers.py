from rest_framework import serializers
from .models import Member

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['id', 'name', 'ph_number', 'profile_image', 'days_left', 'status', 'end_date', 'joined_at']
        read_only_fields = ['days_left', 'status', 'end_date']