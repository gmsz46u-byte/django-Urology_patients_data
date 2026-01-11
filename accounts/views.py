from django.http import HttpResponseRedirect
from django.shortcuts import render,get_object_or_404,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
# from django.contrib.auth.decorators import login_required


# Create your views here.
def register(request):
    if request.user.is_authenticated:
        return redirect('homepage')
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = User.objects.create_user(username=username,email=email,password=password)
        user.save()
    return render(request,template_name="accounts/register_page.html")

def login_view(request):
    if request.user.is_authenticated:
        return redirect('homepage')
    next_url = request.GET.get('next') or request.POST.get('next')
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request,username=username,password=password)
        if user is not None :
            login(request,user)
            print(next_url)
            if next_url:
                return HttpResponseRedirect(next_url)
            return redirect('homepage')
        else :
            return redirect("login_page")
    else:
        return render(request,template_name="accounts/login_page.html")

def logout_view(request):
    logout(request)
    return redirect('login_page')

