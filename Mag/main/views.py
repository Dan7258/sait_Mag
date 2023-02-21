from django.shortcuts import render, redirect
from .forms import ContactForm
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse



def index(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            subject = "Пробное сообщение"
            body = {
                'email': form.cleaned_data['email'],
                'name': form.cleaned_data['name'],
                'telephone': form.cleaned_data['telephone'],
                'telegram': form.cleaned_data['message'],
                'subject': form.cleaned_data['subject'],
                'message': form.cleaned_data['message'],
            }
            message = "\n".join(body.values())
            try:
                print(1)
                send_mail(subject, message, 
                          'ditaljev@yandex.ru',
                          ['italyevdm@gmail.com'])
                print(2)
            except BadHeaderError:
                return HttpResponse('Найден некорректный заголовок')
            return redirect('index_home')

    form = ContactForm()
    return render(request,"main/index.html",{'form': form})

