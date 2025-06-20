from django.urls import path
from .views import StatsListView, MonthlyMembersListView, MonthlyIncomeListView

urlpatterns = [
    path('stats/', StatsListView.as_view(), name="stats"),
    path('stats/monthly-members/<int:year>/', MonthlyMembersListView.as_view(), name="monthly-members"),
    path('stats/monthly-income/<int:year>', MonthlyIncomeListView.as_view(), name="monthly-income")
]
