from django.contrib import admin

from cathedra.models import Teachers


class PhotoTeachersAdmin(admin.ModelAdmin):
    list_display = ('title','photo_tag','status', 'date','id')
    readonly_fields = ('photo_preview',)
    search_fields = ('title','status', 'date','id')
    def photo_preview(self, obj):
        return obj.photo_preview

    photo_preview.short_description = 'Предпросмотр'
    photo_preview.allow_tags = True


admin.site.register(Teachers, PhotoTeachersAdmin)