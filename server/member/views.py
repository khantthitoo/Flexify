from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, status, filters
from rest_framework.response import Response
from .models import Member, Payment
from attendance.models import Attendance
from .serializers import MemberSerializer
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .paginations import MembersPagination
from django_filters.rest_framework import DjangoFilterBackend
from datetime import date

payment_amounts = {
    "one": "50000",
    "three": "120000",
    "twelve": "550000",
}

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
        
        # for payment history and to calculate total income (for dashboard)
        instance = Payment.objects.create(
            plan=membership_type,
            amount=payment_amounts[membership_type]
        )
        instance.save()
        
        return Response({ "success": True, "message": "Membership Activated Successfully" }, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['POST'])
    def checkin(self, request, pk=None):
        member = get_object_or_404(Member, pk=pk)
        
        # So that inactive or expired members can't check in
        if member.status != Member.StatusChoices.ACTIVE:
            return Response({ "code": "broke_guy_checkin", "success": False, "message": "Only Active Members Can Check In" })
        
        # To prevent members from checking in more than 1 time a day
        if Attendance.objects.filter(member=member, date=date.today()).exists():
            return Response({ "code": "already_checkedin", "success": False, "message": "Already Checked In" }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        attendance = Attendance.objects.create(
            member=member
        )
        attendance.save()
        
        return Response({ "success": True, "message": "Successfully Checked In"}, status=status.HTTP_200_OK)