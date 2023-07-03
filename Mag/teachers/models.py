from tabnanny import verbose
from django.db import models

class TeachersAdd(models.Model):
    photo = models.ImageField(blank=True, null = True,upload_to='static/news/downloads', verbose_name='Фото сотрудника')
    title = models.CharField(blank=True, null = True,max_length=100,verbose_name='ФИО')
    status = models.CharField(blank=True, null = True,max_length=100,verbose_name='Должность')
    body = models.TextField(blank=True, null = True,verbose_name='О сотруднике')
    date = models.DateTimeField(verbose_name='Дата публикации')
    class Meta:
        verbose_name = 'Сотрудник ВУЗа'
        verbose_name_plural = 'Сотрудники ВУЗа'
    
    def __str__(self) :
        return self.title