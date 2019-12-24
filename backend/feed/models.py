from django.db import models

# Create your models here.
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
    year = models.DateField()
    brand = models.ForeignKey(Brand, related_name='lookbooks', on_delete=models.CASCADE)
    
    def save(self, *args, **kwargs):
        self.season = self.season.lower()
        return super(Lookbook, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.brand} {self.season}'

class Picture(models.Model): 
    url = models.CharField(max_length=120)
    lookbook = models.ForeignKey(Lookbook, related_name='pictures', on_delete=models.CASCADE)

    def __str__(self):
        return f'Picture {self.id} from {self.lookbook}'