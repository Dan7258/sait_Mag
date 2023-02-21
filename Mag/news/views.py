from django.shortcuts import render
from .models import NewsAdd
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import JsonResponse

def news(request):
    news  = NewsAdd.objects.order_by('-date')
    paginator = Paginator(news,6)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number) 
    return render(request,"news/news.html",{'news': news,'page_obj': page_obj})

def news_data(request):
    news = NewsAdd.objects.all()
    page_number = Paginator(news,6).num_pages
    data = [{
        "title": n.title,
        "body": n.body,
        "photo": n.photo.url,
        "date": n.date,
    } for n in news]
    return JsonResponse({"data": data,"pages":page_number})