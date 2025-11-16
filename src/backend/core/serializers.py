from rest_framework import serializers

from core.models import Event
from core.models import Image
from core.models import Lecture
from core.models import Service
from core.models import Project
from core.models import Formation
from core.models import Experience
from core.models import Technology
from core.models import Publication


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('file',)


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ('id', 'title', 'organisation', 'start_date', 'end_date', 'description', 'contract_type')


class ProjectSerializer(serializers.ModelSerializer):
    image = ImageSerializer()

    class Meta:
        model = Project
        fields = ('id', 'name', 'image', 'description', 'link', 'experience', 'technologies')


class EventSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)

    class Meta:
        model = Event
        fields = ('id', 'name', 'title', 'event_type', 'description', 'start_date', 'end_date', 'location',
                  'source_website', 'images')


class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = ('id', 'name', 'authors', 'abstract', 'link', 'pub_date', 'full_document')


class FormationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formation
        fields = ('id', 'name', 'school', 'start_date', 'end_date')


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ('id', 'name', 'icon')


class ServiceSerializer(serializers.ModelSerializer):
    image = ImageSerializer()

    class Meta:
        model = Service
        fields = ('id', 'name', 'description', 'image')


class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = ('id', 'name', 'description', 'school', 'start_date', 'end_date', 'syllabus')
