
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

from django.conf import settings
from users.views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name = 'index' ),
    path('news/', include('users.urls', namespace= 'users') ),
    path('cathedra/', include('cathedra.urls', namespace= 'cathedra') ),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

