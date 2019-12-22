from django.db import models

# Create your models here.
class Brand(models.Model):
    name = models.CharField(max_length=120)
    url_param = models.CharField(max_length=120, default='url')
    
    # make brand name lowercase for url parameter
    # get rid of spaces as well
    def save(self, *args, **kwargs):
        self.url_param = self.name.lower().replace(" ", '')
        return super(Brand, self).save(*args, **kwargs)

    def __str__(self):
        return self.name