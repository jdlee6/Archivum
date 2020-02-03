from django.db import models
from django.utils import timezone
from django.urls import reverse
from django.contrib.auth.models import User
import uuid

class Brand(models.Model):
    name = models.CharField(max_length=120)
    url_param = models.CharField(max_length=120, default='url')

    def save(self, *args, **kwargs):
        self.url_param = self.name.lower().replace(" ", '')
        return super(Brand, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

class Lookbook(models.Model):
    season = models.CharField(max_length=120)
    # null parameter so postman can mass upload
    brand = models.ForeignKey(Brand, related_name='lookbooks', on_delete=models.CASCADE, null=True)
    year = models.DateField(null=True)

    def save(self, *args, **kwargs):
        self.season = self.season.lower()
        return super(Lookbook, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.brand} {self.season}'

class Picture(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid1, editable=False, unique=True)
    uploaded_at = models.DateTimeField(auto_now=True)
    src = models.FileField(upload_to="images/", blank=True)
    lookbook = models.ForeignKey(Lookbook, related_name='pictures', on_delete=models.CASCADE)
    likes = models.ManyToManyField(User, blank=True, related_name='likes')
    width = models.IntegerField(default=4)
    height = models.IntegerField(default=3)

    def __str__(self):
        return f'{self.src} from {self.lookbook}'
