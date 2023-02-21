from django.shortcuts import render
from .models import TeachersAdd
from django.core.paginator import Paginator
from django.http import JsonResponse

def teachers(request):
    teachers  = TeachersAdd.objects.order_by('date')
    paginator = Paginator(teachers,8)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request,"teachers/teachers.html",{'teachers':teachers,'page_obj':page_obj})

def teachers_data(request):
    teachers = TeachersAdd.objects.all()
    data = [{
        "body": t.body,
        "title": t.title,
        "date": t.date,
        "src": t.photo.url,
        "status": t.status
    } for t in teachers]
    return JsonResponse({"data": data})