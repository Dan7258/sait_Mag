from django.urls import path
from cathedra.views import cathedra, plan, teachers, teachers_data
from django.views.decorators.cache import cache_page
app_name = 'cathedra'

urlpatterns = [
    path('', cache_page(60*2)(cathedra), name = 'cathedra' ),
    path('plan/', cache_page(60*2)(plan), name = 'plan' ),
    path('teachers/', cache_page(60*2)(teachers), name = 'teachers' ),
    path('teachers/data', teachers_data, name='teachers_data')
]