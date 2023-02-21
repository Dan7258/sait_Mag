from tabnanny import verbose
from django.db import models

class NewsAdd(models.Model):
    title = models.CharField(blank=True, null = True,max_length=100,verbose_name='Заголовок')
    body = models.TextField(blank=True, null = True,verbose_name='Новость')
    date = models.DateTimeField(verbose_name='Дата публикации')
    photo = models.ImageField(blank=True, null = True,upload_to='static/news/downloads', verbose_name='Фото')

    class Meta:
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'

    def __str__(self) :
        return self.title