from rest_framework_nested import routers
from .views import MemberViewSet

router = routers.DefaultRouter()
router.register(r'members', MemberViewSet, basename="member")

urlpatterns = router.urls
