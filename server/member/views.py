from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, status, filters
from rest_framework.response import Response
from .models import Member
from .serializers import MemberSerializer
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404

class MemberViewSet(ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    permission_classes = [permissions.IsAdminUser]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'ph_number']
    
    @action(detail=True, methods=['POST'])
    def buy(self, request, pk=None):
        member = get_object_or_404(Member, pk=pk)
        membership_type = request.data.get('type')
        member.activate_membership(membership_type)
        return Response({ "success": True, "message": "Membership Activated Successfully" }, status=status.HTTP_200_OK)
    
        