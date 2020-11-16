from django.shortcuts import render
from enum import Enum


class NavbarRender(Enum):
    HOME = 'home'
    LOGIN = 'login'
    REGISTER = 'register'


# Create your views here.
def index(request):
    return render(request, 'index.html', context={'navbar': NavbarRender.HOME})
