from django.contrib import admin
from users.models import News, Tags, Photo, VideoFile
from django.utils.safestring import mark_safe
# Register your models here.


admin.site.register(Tags)

class PhotoAdmin(admin.ModelAdmin):
    list_display = ('name', 'image_tag')
    readonly_fields = ('image_preview',)
    search_fields = ('name',)
    
    def image_preview(self, obj):
        return obj.image_preview

    image_preview.short_description = 'Предпросмотр'
    image_preview.allow_tags = True


admin.site.register(Photo, PhotoAdmin)

class VideoFileAdmin(admin.ModelAdmin):
    list_display = ['name', 'file_tag']
    readonly_fields = ['file_tag']
    
admin.site.register(VideoFile, VideoFileAdmin)

class PhotoInline(admin.TabularInline):
    model = News.photo.through
    
    readonly_fields = ['image_preview']

    verbose_name = 'Добавьте изображение'  
    verbose_name_plural = 'Добавьте изображения'
    def image_preview(self, instance):
        if instance.photo:
            return mark_safe(f'<img src="{instance.photo.image.url}" style="max-height: 100px;">')
        return ""

class FileInline(admin.TabularInline):
    model = News.video_file.through
    readonly_fields = ['file_link']

    verbose_name = 'Добавьте видео или файл'  
    verbose_name_plural = 'Добавьте видео или файлы'

    def file_link(self, instance):
        if instance.file:
            return mark_safe(f'<a href="{instance.file.file.url}">Скачать</a>')
        return ""

class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'image_preview', 'tag', 'date','id')
    search_fields = ('title','tag__name','date','id')
    inlines = [PhotoInline, FileInline]
    fieldsets = [
    ('Поля для заполнения', {'fields': ['title', 'body', 'tag', 'date']}),
    
    ]
    def image_preview(self, obj):
        # Возвращаем HTML-код с тегом img для отображения предпросмотра изображения
        if obj.photo.exists():
            first_photo = obj.photo.first()
            return mark_safe(f'<img src="{first_photo.image.url}" style="max-height: 100px;">')
        return ""
    image_preview.short_description = 'Предпросмотр'  # Устанавливаем название поля
admin.site.register(News, NewsAdmin)


