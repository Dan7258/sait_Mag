from django.shortcuts import render
from .models import Teachers
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.core.cache import cache
# Create your views here.


def cathedra(request):
    return render(request, 'cathedra/cathedra.html')

def plan(request):
    return render(request, 'cathedra/plan.html')

def teachers(request):
    return render(request,"cathedra/teachers.html")

def teachers_data(request):
    teachers = Teachers.objects.all()
    page_number = Paginator(teachers, 6).num_pages
    
    cached_teachers = cache.get('teachers_data')
    if cached_teachers:
        return JsonResponse(cached_teachers)
    else:
        data = [{
            "body": t.body,
            "title": t.title,
            "date": t.date,
            "src": t.photo.url,
            "status": t.status,
            "id": t.id
        } for t in teachers]
        cache.set('teachers_data', {"data": data, "pages": page_number}, 60 * 1)
        return JsonResponse({"data": data, "pages": page_number})