from django.urls import path
from news import views
from .views import *

urlpatterns = [
    path('', plan, name = 'plan_home' )
]