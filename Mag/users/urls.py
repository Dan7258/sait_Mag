from django.urls import path
from users.views import news, news_data
from django.views.decorators.cache import cache_page
app_name = 'users'

urlpatterns = [
    path('', cache_page(60*2)(news), name = 'news' ),
    path('data', news_data, name= 'news_data')
]

