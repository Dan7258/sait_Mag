from django.urls import path
from main import views
from .views import *

urlpatterns = [
    path('', index, name = 'index_home' ),
    path("index", views.index, name="index"),
]
