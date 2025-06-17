from rest_framework import viewsets, permissions, filters
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from .models import Trainer
from .serializers import TrainerSerializer
from .paginations import TrainerPagination
from attendance.models import Attendance
from datetime import date

class TrainerViewSet(viewsets.ModelViewSet):
    queryset = Trainer.objects.all()
    serializer_class = TrainerSerializer
    pagination_class = TrainerPagination
    permission_classes = [permissions.IsAdminUser]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'ph_number']
    
    @action(detail=True, methods=['POST'])
    def checkin(self, request, pk=None):
        trainer = get_object_or_404(Trainer, pk=pk)
        
        if Attendance.objects.filter(trainer=trainer, date=date.today()).exists():
            return Response({ "code": "already_checkedin", "success": False, "message": "Already Checked In" })
        
        instance = Attendance.objects.create(
            trainer=trainer,
            type=Attendance.TypeChoices.TRAINER
        )    
        instance.save()
        
        return Response({ "success": True, "message": "Successfully Checked In" })
        
    