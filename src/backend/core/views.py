from rest_framework import viewsets

from core.models import Event
from core.models import Lecture
from core.models import Service
from core.models import Project
from core.models import Formation
from core.models import Experience
from core.models import Technology
from core.models import Publication

from core.serializers import EventSerializer
from core.serializers import LectureSerializer
from core.serializers import ServiceSerializer
from core.serializers import ProjectSerializer
from core.serializers import FormationSerializer
from core.serializers import ExperienceSerializer
from core.serializers import TechnologySerializer
from core.serializers import PublicationSerializer


class ExperienceViewSet(viewsets.ModelViewSet):
    serializer_class = ExperienceSerializer
    queryset = Experience.objects.all()
    http_method_names = ('get',)


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.select_related('experience')
    http_method_names = ('get',)


class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.prefetch_related('images')
    http_method_names = ('get',)


class PublicationViewSet(viewsets.ModelViewSet):
    serializer_class = PublicationSerializer
    queryset = Publication.objects.all()
    http_method_names = ('get',)


class FormationViewSet(viewsets.ModelViewSet):
    serializer_class = FormationSerializer
    queryset = Formation.objects.all()
    http_method_names = ('get',)


class TechnologyViewSet(viewsets.ModelViewSet):
    serializer_class = TechnologySerializer
    queryset = Technology.objects.all()
    http_method_names = ('get',)


class ServiceViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    queryset = Service.objects.select_related('image')
    http_method_names = ('get',)


class LectureViewSet(viewsets.ModelViewSet):
    serializer_class = LectureSerializer
    queryset = Lecture.objects.all()
    http_method_names = ('get',)
