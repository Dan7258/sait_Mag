from django.urls import path
from news import views
from .views import *

urlpatterns = [
    path('', news, name = 'news_home' ),
    path('data/', news_data, name="news_data"),
]
