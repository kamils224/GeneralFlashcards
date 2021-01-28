# accounts/views.py
from django.contrib.auth.forms import get_user_model
from django.urls import reverse_lazy
from django.views import generic

from accounts.forms import SignUpForm


class SignUpView(generic.CreateView):
    form_class = SignUpForm
    success_url = reverse_lazy('flashcards_site:index')
    template_name = 'registration/register.html'

