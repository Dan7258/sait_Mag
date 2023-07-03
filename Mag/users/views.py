from django.shortcuts import render
from .models import News, Tags, Photo
from django.core.paginator import Paginator
from django.core.mail import send_mail, BadHeaderError
from django.http import JsonResponse, HttpResponseServerError
from users.forms import ContactForm

# Create your views here.
def index(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            subject = "Проба пера"
            body = {
                'email': 'почта: ' + form.cleaned_data['email'],
                'name': 'ФИО: ' + form.cleaned_data['name'],
                'telephone': 'телефон: ' + form.cleaned_data['telephone'],
                'telegram': 'телеграмм: ' + form.cleaned_data['telegram'],
                'subject': 'заголовок: ' + form.cleaned_data['subject'],
                'message': 'письмо: ' + form.cleaned_data['message'],
            }
            message = "\n".join(body.values())
            try:
                send_mail(subject, message, 
                          'ditaljev@yandex.ru',
                          ['bgordin@internet.ru','italyevdm@gmail.com'])
            except BadHeaderError:
                return HttpResponseServerError('Ошибка отправки сообщения')

            return JsonResponse({'success': True, 'message': 'Ваша заявка отправлена'})

        else:
            return JsonResponse({'success': False, 'message': 'Form validation failed.'})
    
    form = ContactForm()
    return render(request,'users/index.html',{'form': form})


def news(request):
    context = {
    'news': News.objects.order_by('-date'),
    'tags': Tags.objects.all()

    }
    return render(request,'users/news.html',context)



def news_data(request):
    news = News.objects.all()
    page_number = Paginator(news, 6).num_pages
    data = []
    default_photo_url = "/media/mai-news.jpg"
    for n in news:
        photos = Photo.objects.filter(news=n)
        if photos:
            photo_urls = [photo.image.url for photo in photos]
        else:
            photo_urls = [default_photo_url]
        data.append({
            "title": n.title,
            "body": n.body,
            "photo": photo_urls,
            "date": n.date,
            "id": n.id
        })
    return JsonResponse({"data": data, "pages": page_number})