# Generated by Django 3.0.1 on 2020-01-07 00:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20200106_2307'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='email',
            field=models.EmailField(default='enter email', max_length=120),
        ),
        migrations.AddField(
            model_name='profile',
            name='username',
            field=models.CharField(default='enter username', max_length=120),
        ),
    ]
