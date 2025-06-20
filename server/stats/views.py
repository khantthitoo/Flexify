from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from member.models import Payment, Member
from trainer.models import Trainer
from datetime import datetime, timedelta
from calendar import monthrange
from django.utils.timezone import now
from django.db.models.functions import TruncMonth
from django.db.models import Count, Sum

def get_growth_rate():
    today = now().date()
    first_day_this_month = today.replace(day=1)
    
    last_day_last_month = first_day_this_month - timedelta(days=1)
    first_day_last_month = last_day_last_month.replace(day=1)
    
    this_month_members_count = Member.objects.filter(
        joined_at__gte=first_day_this_month,
        joined_at__lte=today
    ).count()
    
    last_month_members_count = Member.objects.filter(
        joined_at__gte=first_day_last_month,
        joined_at__lte=last_day_last_month
    ).count()
    
    # gym's first month then   "First month — no previous data"
    if last_month_members_count == 0:
        return 0
    
    growth_rate = ((this_month_members_count - last_month_members_count) / last_month_members_count) * 100
    return growth_rate

def get_monthly_members_count(year):
    qs = Member.objects.filter(joined_at__year=year)
    qs = qs.annotate(month=TruncMonth('joined_at'))
    qs = qs.values('month').annotate(count=Count('id')).order_by('month')

    data_map = {item['month'].month: item['count'] for item in qs}

    full_year = []
    for m in range(1, 13):
        full_year.append({
            'month': datetime(year, m, 1).strftime('%B'),
            'count': data_map.get(m, 0)
        })

    return full_year

def get_monthly_income(year):
    qs = Payment.objects.filter(date__year=year)
    qs = qs.annotate(month=TruncMonth('date'))
    qs = qs.values('month').annotate(total_income=Sum('amount')).order_by('month')
    
        # Build a map of month -> income
    data_map = {item['month'].month: item['total_income'] for item in qs}

    # Fill in all months, use 0 if no data
    full_year = []
    for m in range(1, 13):
        full_year.append({
            'month': datetime(year, m, 1).strftime('%B'),
            'income': float(data_map.get(m, 0))
        })

    return full_year

def get_income_growth_rate():
    today = now().date()
    first_day_this_month = today.replace(day=1)
    
    last_day_last_month = first_day_this_month - timedelta(days=1)
    first_day_last_month = last_day_last_month.replace(day=1)
    
    this_month_total_income = Payment.objects.filter(
        date__gte=first_day_this_month,
        date__lte=today
    ).aggregate(total=Sum('amount'))['total'] or 0
    
    last_month_total_income = Payment.objects.filter(
        date__gte=first_day_last_month,
        date__lte=last_day_last_month
    ).aggregate(total=Sum('amount'))['total'] or 0
    
    if last_month_total_income == 0:
        return 0
    
    growth_rate = ((this_month_total_income - last_month_total_income) / last_month_total_income) * 100
    return growth_rate

class StatsListView(APIView):
    def get(self, request):
        # sum up all the payments to get the total income
        get_monthly_income(2025)   
        total_income = Payment.objects.all().aggregate(
            total=Sum('amount')
        )['total'] or 0
            
        # get the total number of active members
        active_members = Member.objects.filter(status=Member.StatusChoices.ACTIVE).count()
        
        # get the total number of trainers
        total_trainers = Trainer.objects.all().count()
        
        data = {
            "total_income": total_income,
            "active_members": active_members,
            "total_trainers": total_trainers,
            "growth_rate": get_growth_rate(),
        }
        
        return Response(data, status=status.HTTP_200_OK)
    
class MonthlyMembersListView(APIView):
    def get(self, request, year):     
        return Response({
            "chart_data": get_monthly_members_count(year),
            "growth_rate": get_growth_rate()
        }, status=status.HTTP_200_OK)
        
class MonthlyIncomeListView(APIView):
    def get(self, request, year):
        return Response({
            "chart_data": get_monthly_income(year),
            "growth_rate": get_income_growth_rate(),
        })