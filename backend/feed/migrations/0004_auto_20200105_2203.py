# Generated by Django 3.0.1 on 2020-01-05 22:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feed', '0003_auto_20191230_0551'),
    ]

    operations = [
        migrations.AlterField(
            model_name='picture',
            name='height',
            field=models.IntegerField(default=3),
        ),
        migrations.AlterField(
            model_name='picture',
            name='width',
            field=models.IntegerField(default=4),
        ),
    ]