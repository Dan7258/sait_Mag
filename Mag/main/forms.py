from django.contrib.auth.forms import UserCreationForm
from django import forms



class ContactForm(forms.Form):
    email = forms.EmailField(widget=forms.TextInput(attrs={'class':'request_input','placeholder':'Email'}))
    name = forms.CharField(max_length=90, widget=forms.TextInput(attrs={'class':'request_input','placeholder':'ФИО'}))
    telephone = forms.CharField(required=True,widget=forms.TextInput(attrs={'class':'request_input','placeholder':'Телефон'}))
    telegram = forms.CharField(required=True,widget=forms.TextInput(attrs={'class':'request_input','placeholder':'Telegram'}))
    subject = forms.CharField(max_length=90,widget=forms.TextInput(attrs={'class':'request_input','placeholder':'Тема письма'}) )
    message = forms.CharField(widget=forms.Textarea(attrs={'class':'request_input textarea','placeholder':'Ваше сообщение'}))
