# Generated by Django 4.1.1 on 2022-10-05 16:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0002_alter_newsadd_body_alter_newsadd_files_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='newsadd',
            name='files',
        ),
    ]
