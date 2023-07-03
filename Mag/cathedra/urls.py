from django.urls import path
from cathedra.views import cathedra, plan, teachers, teachers_data

app_name = 'cathedra'

urlpatterns = [
    path('', cathedra, name = 'cathedra' ),
    path('plan/', plan, name = 'plan' ),
    path('teachers/', teachers, name = 'teachers' ),
    path('teachers/data', teachers_data, name='teachers_data')
]