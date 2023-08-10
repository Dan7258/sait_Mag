from django.shortcuts import render
from .models import News, Tags, Photo, VideoFile
from django.core.paginator import Paginator
from django.core.mail import send_mail, BadHeaderError
from django.http import JsonResponse
from users.forms import ContactForm
from django.core.cache import cache
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
                
                send_mail(subject, message, 'ditaljev@yandex.ru', ['bgordin@internet.ru', 'italyevdm@gmail.com'])
            except BadHeaderError as e:
                return JsonResponse({'success': False, 'message': 'Ошибка отправки сообщения', 'error': str(e)})

            return JsonResponse({'success': True, 'message': 'Ваша заявка отправлена'})

        else:
            return JsonResponse({'success': False, 'message': 'Form validation failed.'})
    
    form = ContactForm()
    return render(request,'users/index.html',{'form': form})


def news(request):
    return render(request,'users/news.html')



def news_data(request):
    news = News.objects.all()
    
    data = []
    default_photo_url = "/media/mai-news.jpg"
    cached_data = cache.get('news_data')
    if cached_data:
        return JsonResponse(cached_data)
    else:
        page_number = Paginator(news, 6).num_pages
        for n in news:
            photos = Photo.objects.filter(news=n)
            video_files = VideoFile.objects.filter(news=n)
            tags = Tags.objects.filter(news=n)

            tags_urls = ['#' + tag.name for tag in tags]
            if photos:
                photo_urls = [photo.image.url for photo in photos]
            else:
                photo_urls = [default_photo_url]
            
            video_file_urls = []
            if video_files.exists():
                video_file_urls = [fv.video_file.url for fv in video_files]
                
            if video_file_urls:
                data.append({
                    "title": n.title,
                    "body": n.body,
                    "photo": photo_urls,
                    "video_file": video_file_urls,  # Используем первый URL, если доступно
                    "date": n.date,
                    "id": n.id,
                    "tags": tags_urls,
                })
            else:
                data.append({
                    "title": n.title,
                    "body": n.body,
                    "photo": photo_urls,
                    "video_file": "",  # Пустая строка в качестве значения по умолчанию
                    "date": n.date,
                    "id": n.id,
                    "tags": tags_urls,
                })
        cache.set('news_data', {"data": data, "pages": page_number}, 30)

        return JsonResponse({"data": data, "pages": page_number})