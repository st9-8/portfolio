from django import forms
from django.contrib import admin
from django.utils.html import format_html

from core.models import Event
from core.models import Image
from core.models import Lecture
from core.models import Project
from core.models import Service
from core.models import Formation
from core.models import Experience
from core.models import Technology
from core.models import Publication


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'organisation', 'contract_type', 'work_type')
    list_filter = ('contract_type', 'work_type', 'work_place_type')
    search_fields = ('title', 'organisation')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'link')
    search_fields = ('name',)


class EventAdminForm(forms.ModelForm):
    upload_images = forms.FileField(
        widget=forms.ClearableFileInput(attrs={'multiple': True}),
        label='Upload images',
        required=False,
        help_text='Select one or more images'
    )

    class Meta:
        model = Event
        fields = '__all__'


class ImageEventInline(admin.TabularInline):
    model = Event.images.through
    extra = 0
    readonly_fields = ('image_preview',)
    fields = ('image', 'image_preview')

    def image_preview(self, obj):
        if obj.image and hasattr(obj.image, 'file') and obj.image.file:
            return format_html(
                '<img src="{}" style="max-height: 80px; max-width: 120px; object-fit: cover; border-radius: 8px;" />',
                obj.image.file.url
            )
        return "—"

    image_preview.short_description = "Preview"


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    form = EventAdminForm

    list_display = ('name', 'title', 'event_type')
    list_filter = ('event_type',)
    inlines = [ImageEventInline]

    fieldsets = (
        ('General informations', {
            'fields': ('name', 'title', 'event_type', 'description', 'start_date', 'end_date', 'location',
                       'source_website')
        }),
        ('Images', {
            'fields': ('upload_images',),
            'description': 'Upload new images or manage existing ones'
        }),
    )

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

        files = request.FILES.getlist('upload_images')

        for file in files:
            image = Image.objects.create(file=file)
            obj.images.add(image)

    def images_count(self, obj):
        from django.utils.html import format_html
        count = obj.images.count()
        return format_html(
            '<span style="background: #1e4194; color: white; padding: 3px 10px; border-radius: 12px;">{}</span>',
            count
        )

    images_count.short_description = 'Count'

    def images_preview(self, obj):
        images = obj.images.all()[:3]  # Afficher max 3 miniatures
        if not images:
            return "—"

        html = '<div style="display: flex; gap: 5px;">'
        for img in images:
            if img.file:
                html += f'<img src="{img.file.url}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 5px;" />'
        if obj.images.count() > 3:
            html += f'<span style="padding: 10px; color: #666;">+{obj.images.count() - 3}</span>'
        html += '</div>'
        return format_html(html)

    images_preview.short_description = 'Preview'


@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'authors', 'pub_date')
    search_fields = ('name', 'authors')


@admin.register(Formation)
class FormationAdmin(admin.ModelAdmin):
    list_display = ('name', 'school', 'start_date', 'end_date')


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ('name', 'icon_preview')

    def icon_preview(self, obj):
        if obj.icon:
            return format_html(
                '<img src="{}" width="30" height="30" />', obj.icon.url
            )
        return "No icon"


class ServiceAdminForm(forms.ModelForm):
    new_image = forms.ImageField(required=False, label="Or upload a new image")

    class Meta:
        model = Service
        fields = '__all__'

    def save(self, commit=True):
        instance = super().save(commit=False)

        if self.cleaned_data.get('new_image'):
            new_img = Image.objects.create(
                file=self.cleaned_data['new_image']
            )
            instance.image = new_img

        if commit:
            instance.save()
        return instance


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    form = ServiceAdminForm

    list_display = ('name',)
    search_fields = ('name', 'description', 'image_preview')

    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image and obj.image.file:
            return format_html(
                '<img src="{}" style="max-width: 200px; max-height: 200px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />',
                obj.image.file.url
            )
        return "Aucune image sélectionnée"

    image_preview.short_description = "Preview"


@admin.register(Lecture)
class LectureAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'school', 'start_date', 'end_date')


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    pass
