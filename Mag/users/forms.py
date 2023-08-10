
from django import forms

class ContactForm(forms.Form):
    email = forms.CharField(widget=forms.EmailInput(attrs={
            'class': 'request_input',
            #'placeholder': 'Введите ваш email',
        })
    )
    name = forms.CharField(max_length=90,widget=forms.TextInput(attrs={
            'class': 'request_input',
            #'placeholder': 'Введите ваше имя',
        })
    )
    telephone = forms.CharField(required=True,widget=forms.TextInput(attrs={
            'pattern': '^(\+7|8|\+\d{1,3})?(\s*\d{3}){2}(\s*\d{2}){2}$|^(\+7|8|\+\d{1,3})\(\d{3}\)\s*\d{3}(\s*\d{2}){2}$|^(\+7|8|\+\d{1,3})-\d{3}-\d{2}-\d{2}$|^\d{10}$',
            'required title': 'Введите корректный номер телефона (например, +7XXXXXXXXXX)',
            'class': 'request_input',
            #'placeholder': 'Введите ваш номер телефона',
        })
    )
    telegram = forms.CharField(required=True,widget=forms.TextInput(attrs={
            'class': 'request_input',
            #'placeholder': 'Введите ваш Telegram',
        })
    )
    subject = forms.CharField(max_length=90,widget=forms.TextInput(attrs={
            'class': 'request_input',
            #'placeholder': 'Введите тему сообщения',
        })
    )
    message = forms.CharField(widget=forms.Textarea(attrs={
            'class': 'request_input textarea',
            #'placeholder': 'Введите ваше сообщение',
        })
    )
