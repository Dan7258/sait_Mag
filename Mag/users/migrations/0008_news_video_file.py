# Generated by Django 3.2.13 on 2023-06-28 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_auto_20230628_1725'),
    ]

    operations = [
        migrations.AddField(
            model_name='news',
            name='video_file',
            field=models.FileField(blank=True, null=True, upload_to='', verbose_name='Видео,файл'),
        ),
    ]
