from django.urls import path
from users.views import news, news_data

app_name = 'users'

urlpatterns = [
    path('', news, name = 'news' ),
    path('data', news_data, name= 'news_data')
]

