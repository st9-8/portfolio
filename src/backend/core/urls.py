from rest_framework.routers import DefaultRouter

from core.views import EventViewSet
from core.views import LectureViewSet
from core.views import ProjectViewSet
from core.views import ServiceViewSet
from core.views import FormationViewSet
from core.views import ExperienceViewSet
from core.views import TechnologyViewSet
from core.views import PublicationViewSet

router = DefaultRouter()

router.register('events', EventViewSet, basename='events')
router.register('lectures', LectureViewSet, basename='lectures')
router.register('projects', ProjectViewSet, basename='projects')
router.register('services', ServiceViewSet, basename='services')
router.register('formations', FormationViewSet, basename='formations')
router.register('experiences', ExperienceViewSet, basename='experiences')
router.register('technologies', TechnologyViewSet, basename='technologies')
router.register('publications', PublicationViewSet, basename='publications')

urlpatterns = router.urls
