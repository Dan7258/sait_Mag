from django.db import models
from django.utils.safestring import mark_safe
# Create your models here.


class Teachers(models.Model):
    id = models.AutoField(primary_key=True)
    photo = models.ImageField(blank=True, null = True,default='no-avatar.jpg', verbose_name='Фото сотрудника')
    title = models.CharField(blank=True, null = True,max_length=100,verbose_name='ФИО')
    status = models.CharField(blank=True, null = True,max_length=100,verbose_name='Должность')
    body = models.TextField(blank=True, null = True,verbose_name='О сотруднике')
    date = models.DateTimeField(verbose_name='Дата публикации')

    
    def photo_tag(self):
        # Возвращаем HTML-код с тегом img для отображения уменьшенного изображения в админке
        return mark_safe(f'<img src="{self.photo.url}" style="max-height: 100px;">')
    photo_tag.short_description = 'Фото сотрудника' 

    def __str__(self) :
        return self.title
    
    class Meta:
        verbose_name = 'Сотрудник ВУЗа'
        verbose_name_plural = 'Сотрудники ВУЗа'    

    @property
    def photo_preview(self):
        if self.photo:
            return mark_safe(f'<img src="{self.photo.url}" style="max-height: 300px;">')
        return ""