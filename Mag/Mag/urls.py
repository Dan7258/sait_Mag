
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.views.decorators.cache import cache_page
from django.conf import settings
from users.views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',cache_page(60*2)(index), name = 'index' ),
    path('news/', include('users.urls', namespace= 'users') ),
    path('cathedra/', include('cathedra.urls', namespace= 'cathedra') ),

]
if settings.DEBUG:
    urlpatterns.append(path("__debug__/", include("debug_toolbar.urls")))
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


