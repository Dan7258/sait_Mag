# Generated by Django 3.2.13 on 2023-06-28 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_news_video_file'),
    ]

    operations = [
        migrations.CreateModel(
            name='VideoFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, null=True, unique=True)),
                ('video_file', models.FileField(blank=True, null=True, upload_to='', verbose_name='Видео,файл')),
            ],
            options={
                'verbose_name': 'Видео или файл',
                'verbose_name_plural': 'Видео или файлы',
            },
        ),
        migrations.RemoveField(
            model_name='news',
            name='video_file',
        ),
        migrations.AddField(
            model_name='news',
            name='video_file',
            field=models.ManyToManyField(blank=True, to='users.VideoFile', verbose_name='Видео,файл'),
        ),
    ]
