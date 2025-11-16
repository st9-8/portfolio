from django.db import models

from core.enums import WorkTypeEnum
from core.enums import EventTypeEnum
from core.enums import ContractTypeEnum
from core.enums import WorkTypePlaceEnum


class Experience(models.Model):
    title: models.CharField = models.CharField(max_length=255)
    organisation: models.CharField = models.CharField(max_length=255)
    start_date: models.DateField = models.DateField()
    end_date: models.DateField = models.DateField()
    description: models.TextField = models.TextField(blank=True)
    contract_type: models.CharField = models.CharField(max_length=255, choices=ContractTypeEnum.choices(), blank=True,
                                                       null=True)
    location: models.CharField = models.CharField(max_length=255)
    work_type: models.CharField = models.CharField(max_length=255, choices=WorkTypeEnum.choices())
    work_place_type: models.CharField = models.CharField(max_length=255, choices=WorkTypePlaceEnum.choices())

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('-start_date',)


class Project(models.Model):
    name: models.CharField = models.CharField(max_length=255)
    image: models.ForeignKey = models.ForeignKey('core.Image', on_delete=models.SET_NULL, related_name='projects',
                                                 blank=True, null=True)
    description: models.TextField = models.TextField(blank=True)
    link: models.URLField = models.URLField(blank=True, null=True)
    experience: models.ForeignKey = models.ForeignKey(Experience, on_delete=models.SET_NULL, blank=True, null=True)
    technologies: models.CharField = models.CharField(max_length=255, blank=True,
                                                      help_text='Comma-separated technologies used')

    def __str__(self):
        return self.name


class Event(models.Model):
    name: models.CharField = models.CharField(max_length=255)
    title: models.CharField = models.CharField(max_length=255, help_text='My title at that event')
    description: models.TextField = models.TextField(blank=True)
    event_type: models.CharField = models.CharField(max_length=255, choices=EventTypeEnum.choices())
    start_date: models.DateField = models.DateField()
    end_date: models.DateField = models.DateField(blank=True, null=True)
    location: models.CharField = models.CharField(blank=True, null=True)
    source_website: models.URLField = models.URLField(blank=True, null=True)
    images: models.ManyToManyField = models.ManyToManyField('core.Image', blank=True, related_name='events')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('-start_date',)


class Publication(models.Model):
    name: models.CharField = models.CharField(max_length=255)
    authors: models.CharField = models.CharField(max_length=255, help_text='Comma-separated author names')
    abstract: models.TextField = models.TextField(blank=True)
    link: models.URLField = models.URLField(blank=True, null=True)
    pub_date: models.DateField = models.DateField()
    full_document: models.FileField = models.FileField(upload_to='publications/')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('-pub_date',)


class Formation(models.Model):
    name: models.CharField = models.CharField(max_length=255)
    school: models.CharField = models.CharField(max_length=255)
    start_date: models.DateField = models.DateField()
    end_date: models.DateField = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('-start_date',)


class Technology(models.Model):
    name: models.CharField = models.CharField(max_length=255)
    icon: models.ImageField = models.ImageField(upload_to='tech_icons/')

    def __str__(self):
        return self.name


class Service(models.Model):
    name: models.CharField = models.CharField(max_length=255)
    description: models.TextField = models.TextField(blank=True)
    image: models.ForeignKey = models.ForeignKey('core.Image', on_delete=models.SET_NULL, related_name='services',
                                                 blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('-id',)


class Lecture(models.Model):
    name: models.CharField = models.CharField(max_length=255)
    description: models.TextField = models.TextField(blank=True)
    school: models.CharField = models.CharField(max_length=255)
    start_date: models.DateField = models.DateField()
    end_date: models.DateField = models.DateField(blank=True, null=True)
    syllabus: models.FileField = models.FileField(upload_to='syllabus')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('-start_date',)


class Image(models.Model):
    file = models.ImageField(upload_to='images/')
