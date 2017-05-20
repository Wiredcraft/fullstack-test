from django.db import models
from django.conf import settings


class Post(models.Model):
    title = models.CharField(max_length=40)
    description = models.CharField(max_length=200)
    user = models.ForeignKey(settings.AUTH_USER_MODEL)

    @property
    def username(self):
        return self.user.username

