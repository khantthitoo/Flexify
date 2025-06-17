from rest_framework.viewsets import ModelViewSet
from rest_framework import generics
from rest_framework import permissions, status, filters
from rest_framework.response import Response
from .models import Member
from attendance.models import Attendance
from .serializers import MemberSerializer
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .paginations import MembersPagination
from django_filters.rest_framework import DjangoFilterBackend
from datetime import date

class MemberViewSet(ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    permission_classes = [permissions.IsAdminUser]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'ph_number']
    pagination_class = MembersPagination
    
    @action(detail=True, methods=['POST'])
    def buy(self, request, pk=None):
        member = get_object_or_404(Member, pk=pk)
        membership_type = request.data.get('type')
        member.activate_membership(membership_type)
        return Response({ "success": True, "message": "Membership Activated Successfully" }, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['POST'])
    def checkin(self, request, pk=None):
        member = get_object_or_404(Member, pk=pk)
        
        if member.status != Member.StatusChoices.ACTIVE:
            return Response({ "code": "broke_guy_checkin", "success": False, "message": "Only Active Members Can Check In" })
        
        if Attendance.objects.filter(member=member, date=date.today()).exists():
            return Response({ "code": "already_checkedin", "success": False, "message": "Already Checked In" }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        attendance = Attendance.objects.create(
            member=member
        )
        attendance.save()
        return Response({ "success": True, "message": "Successfully Checked In"}, status=status.HTTP_200_OK)