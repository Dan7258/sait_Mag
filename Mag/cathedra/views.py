from django.shortcuts import render
from .models import Teachers
from django.core.paginator import Paginator
from django.http import JsonResponse
# Create your views here.


def cathedra(request):
    return render(request, 'cathedra/cathedra.html')

def plan(request):
    return render(request, 'cathedra/plan.html')

def teachers(request):
    teachers  = Teachers.objects.order_by('date')
    paginator = Paginator(teachers,8)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request,"cathedra/teachers.html",{'teachers':teachers,'page_obj':page_obj})

def teachers_data(request):
    teachers = Teachers.objects.all()
    data = [{
        "body": t.body,
        "title": t.title,
        "date": t.date,
        "src": t.photo.url,
        "status": t.status,
        "id": t.id
    } for t in teachers]
    return JsonResponse({"data": data})