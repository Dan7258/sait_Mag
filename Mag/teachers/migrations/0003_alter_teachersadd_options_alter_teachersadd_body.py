# Generated by Django 4.1.1 on 2022-10-05 14:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0002_alter_teachersadd_body'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='teachersadd',
            options={'verbose_name': 'Сотрудники ВУЗа', 'verbose_name_plural': 'Сотрудники ВУЗа'},
        ),
        migrations.AlterField(
            model_name='teachersadd',
            name='body',
            field=models.TextField(blank=True, null=True, verbose_name='О сотруднике'),
        ),
    ]
