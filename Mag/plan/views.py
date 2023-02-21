from django.shortcuts import render

def plan(request):
    return render(request,"plan/plan.html")
