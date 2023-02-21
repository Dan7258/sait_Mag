from django.urls import path,re_path
from teachers import views
from .views import *

urlpatterns = [
    path('', teachers, name = 'teachers_home' ),
    path('data/', teachers_data, name="teachers_data"),
]