# Generated by Django 3.0.1 on 2020-01-11 21:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_auto_20200111_2004'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.FileField(default='default.jpg', upload_to='avatars/'),
        ),
    ]