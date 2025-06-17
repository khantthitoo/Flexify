from rest_framework_nested import routers
from .views import MemberViewSet
from django.urls import include, path

router = routers.DefaultRouter()
router.register(r'members', MemberViewSet, basename="member")

urlpatterns = router.urls
