from rest_framework_nested import routers
from .views import TrainerViewSet

router = routers.DefaultRouter()
router.register(r'trainers', TrainerViewSet, basename="trainer")

urlpatterns = router.urls