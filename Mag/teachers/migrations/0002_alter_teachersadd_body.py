# Generated by Django 4.1.1 on 2022-10-05 14:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teachersadd',
            name='body',
            field=models.TextField(null=True, verbose_name='О сотруднике'),
        ),
    ]
