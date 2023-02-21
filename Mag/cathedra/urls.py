from django.urls import path
from news import views
from .views import *

urlpatterns = [
    path('', cathedra, name = 'cathedra_home' ),
]