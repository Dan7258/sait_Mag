# Generated by Django 3.2.13 on 2023-03-26 20:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20230326_2258'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='photo',
            name='preview',
        ),
    ]