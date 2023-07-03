from django.db import models
from django.utils.safestring import mark_safe
from ckeditor.fields import RichTextField

class Photo(models.Model):
    name = models.CharField(blank=True, null = True,max_length=100, unique=True)
    image = models.ImageField()

    def image_tag(self):
        # Возвращаем HTML-код с тегом img для отображения уменьшенного изображения в админке
        return mark_safe(f'<img src="{self.image.url}" style="max-height: 100px;">')
    image_tag.short_description = 'Изображение' 
    
    def __str__(self) :
        return self.name
    class Meta:
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'
    
    
    @property
    def image_preview(self):
        if self.image:
            return mark_safe(f'<img src="{self.image.url}" style="max-height: 300px;">')
        return ""
    
class VideoFile(models.Model):
    name = models.CharField(blank=True, null=True, max_length=100, unique=True)
    video_file = models.FileField(blank=True, null=True, verbose_name='Видео файл')

    def file_tag(self):
        # Возвращаем HTML-код с тегом video для отображения видео в админке
        if self.video_file:
            return mark_safe(f'<video src="{self.video_file.url}" controls style="max-height: 100px;"></video>')
        return ""
    file_tag.short_description = 'Видео или файл'

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Видео или файл'
        verbose_name_plural = 'Видео или файлы'

    @property
    def file_link(self):
        if self.video_file:
            return mark_safe(f'<a href="{self.video_file.url}">Скачать</a>')
        return ""
       

class Tags(models.Model):
    name = models.CharField(blank=True, null = True,max_length=100, unique=True)
    
    
    class Meta:
        verbose_name = 'Тэг'
        verbose_name_plural = 'Тэги'
    
    def __str__(self) :
        return self.name

class News(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(blank=True, null = True,max_length=100,verbose_name='Заголовок')
    body = RichTextField(blank=True, null = True,verbose_name='Новость')
    date = models.DateTimeField(verbose_name='Дата публикации')
    photo = models.ManyToManyField(Photo, blank=True, verbose_name='Фото')
    video_file = models.ManyToManyField(VideoFile,blank=True,verbose_name='Видео,файл')
    tag = models.ForeignKey(to = Tags,blank=True, null = True, on_delete = models.PROTECT, verbose_name='Тэг')

    class Meta:
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'

    def __str__(self) :
        return self.title
    
    