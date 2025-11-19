from django.db import models

from core.enums import WorkTypeEnum
from core.enums import EventTypeEnum
from core.enums import ContractTypeEnum
from core.enums import WorkTypePlaceEnum

from django_prose_editor.fields import ProseEditorField

rich_text_fields_data = {
    # Core text formatting
    "Bold": True,
    "Italic": True,
    "Strike": True,
    "Underline": True,
    "HardBreak": True,

    # Structure
    "Heading": {
        "levels": [1, 2, 3]  # Only allow h1, h2, h3
    },
    "BulletList": True,
    "OrderedList": True,
    "ListItem": True,  # Used by BulletList and OrderedList
    "Blockquote": True,

    # Advanced extensions
    "Link": {
        "enableTarget": True,  # Enable "open in new window"
        "protocols": ["http", "https", "mailto"],  # Limit protocols
    },
    "Table": True,
    "TableRow": True,
    "TableHeader": True,
    "TableCell": True,

    # Editor capabilities
    "History": True,  # Enables undo/redo
    "HTML": True,  # Allows HTML view
    "Typographic": True,  # Enables typographic chars
}


class Experience(models.Model):
    title: models.CharField = models.CharField(max_length=255)
    organisation: models.CharField = models.CharField(max_length=255)
    start_date: models.DateField = models.DateField()
    end_date: models.DateField = models.DateField(blank=True, null=True)
    description: ProseEditorField = ProseEditorField(
        extensions={
            **rich_text_fields_data
        },
        sanitize=True
    )
    contract_type: models.CharField = models.CharField(max_length=255, choices=ContractTypeEnum.choices(), blank=True,
                                                       null=True)
    location: models.CharField = models.CharField(max_length=255)
    work_type: models.CharField = models.CharField(max_length=255, choices=WorkTypeEnum.choices())
    work_place_type: models.CharField = models.CharField(max_length=255, choices=WorkTypePlaceEnum.choices())

    def __str__(self):
        return f'{self.title} - {self.organisation}'

    class Meta:
        ordering = ('-start_date',)


class Project(models.Model):
    name: models.CharField = models.CharField(max_length=255)
    image: models.ForeignKey = models.ForeignKey('core.Image', on_delete=models.SET_NULL, related_name='projects',
                                                 blank=True, null=True)
    description: ProseEditorField = ProseEditorField(
        extensions={
            **rich_text_fields_data
        },
        sanitize=True
    )
    link: models.URLField = models.URLField(blank=True, null=True)
    experience: models.ForeignKey = models.ForeignKey(Experience, on_delete=models.SET_NULL, blank=True, null=True)
    technologies: models.CharField = models.CharField(max_length=255, blank=True,
                                                      help_text='Comma-separated technologies used')

    def __str__(self):
        return self.name


class Event(models.Model):
    name: models.CharField = models.CharField(max_length=255)
    title: models.CharField = models.CharField(max_length=255, help_text='My title at that event')
    description: ProseEditorField = ProseEditorField(
        extensions={
            **rich_text_fields_data
        },
        sanitize=True
    )
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
    full_document: models.FileField = models.FileField(upload_to='publications/', blank=True, null=True)

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
    icon: models.ImageField = models.ImageField(upload_to='tech_icons/', blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Technologies'


class Service(models.Model):
    name: models.CharField = models.CharField(max_length=255)
    description: ProseEditorField = ProseEditorField(
        extensions={
            **rich_text_fields_data
        },
        sanitize=True
    )
    image: models.ForeignKey = models.ForeignKey('core.Image', on_delete=models.SET_NULL, related_name='services',
                                                 blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('-id',)


class Lecture(models.Model):
    name: models.CharField = models.CharField(max_length=255)
    description: ProseEditorField = ProseEditorField(
        extensions={
            **rich_text_fields_data
        },
        sanitize=True
    )
    school: models.CharField = models.CharField(max_length=255)
    start_date: models.DateField = models.DateField()
    end_date: models.DateField = models.DateField(blank=True, null=True)
    syllabus: models.FileField = models.FileField(upload_to='syllabus', blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('-start_date',)


class Image(models.Model):
    file = models.ImageField(upload_to='images/')


class Me(models.Model):
    """
        My own model for details
    """

    title: models.CharField = models.CharField(max_length=255)
    bio: models.TextField = models.TextField()
    background: models.TextField = models.TextField()
    picture: models.ImageField = models.ImageField(upload_to='pp/')
    email: models.EmailField = models.EmailField(blank=True)
    github_link: models.URLField = models.URLField(blank=True)
    linkedin_link: models.URLField = models.URLField(blank=True)
    x_link: models.URLField = models.URLField(blank=True)
    upwork_link: models.URLField = models.URLField(blank=True)


    def __str__(self):
        return 'Me'

    class Meta:
        verbose_name_plural = 'Me'