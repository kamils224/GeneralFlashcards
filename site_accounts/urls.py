from django.contrib.auth import views as auth_views
from django.urls import path, reverse_lazy
from .views import SignUpView

app_name = 'accounts'

urlpatterns = [
    path('register/', SignUpView.as_view(), name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='registration/login.html',
                                                redirect_authenticated_user=True),
         name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('password_reset/', auth_views.PasswordResetView.as_view(
        template_name='registration/pwd_reset_form.html',
        success_url=reverse_lazy('accounts:password_reset_done')),
         name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(
        template_name='registration/pwd_reset_done.html'),
        name='password_reset_done'),
    path('reset/', auth_views.PasswordResetConfirmView.as_view(
        template_name='registration/pwd_reset_confirm.html'),
         name='password_reset_confirm'),
    path('reset/done', auth_views.PasswordResetCompleteView.as_view(
        template_name='registration/pwd_reset_complete.html'),
         name='password_reset_complete')
]
