import os
from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
from django.core.files.storage import default_storage as storage
from PIL import Image


class Profile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    avatar = models.FileField(upload_to='avatars/', default='avatars/default.jpg')
    bio = models.TextField(max_length=200, blank=True)
    location = models.CharField(max_length=100, blank=True)

    def save(self, *args, **kwargs):
        super(Profile, self).save(*args, **kwargs)
        self.create_thumbnail()

    def create_thumbnail(self):
        file_path = self.avatar.name
        base, ext = os.path.splitext(file_path)
        thumbnail_path = f'{base}_thumbnail.jpg'
        if not storage.exists(f'avatars/{thumbnail_path}'):
            f = storage.open(file_path, 'r')
            img = Image.open(f)
            if img.height != 300 or img.width != 300:
                output_size = (300,300)
                img.thumbnail(output_size)
                f_thumbnail = storage.open(thumbnail_path, 'w')
                img.save(f_thumbnail, 'JPEG')
                f_thumbnail.close()
            else:
                return

    def __str__(self):
        return f'{self.user.username} Profile'


############ SIGNALS ############
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()

@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)