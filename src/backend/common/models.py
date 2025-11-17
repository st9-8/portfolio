from django.db import models
from django.db import OperationalError
from django.db import ProgrammingError

from django.core.cache import cache

from django.core.exceptions import ValidationError

from django.utils.translation import gettext as _


class Singleton(models.Model):
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super(Singleton, self).save(*args, **kwargs)
        self.set_cache()

    def delete(self, using=None, keep_parents=False):
        raise ValidationError(_('Unable to delete this model'))

    def set_cache(self):
        cache.set(self.__class__.__name__, self)

    @classmethod
    def load(cls):
        from django.db import connection

        if 'core_me' not in connection.introspection.table_names():
            return None

        try:
            if cache.get(cls.__name__) is None:
                unique_instance, created = cls.objects.get_or_create(pk=1)
                if not created:
                    unique_instance.set_cache()
        except (ProgrammingError, OperationalError):
            pass

        return cache.get(cls.__name__)
