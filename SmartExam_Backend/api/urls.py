
from django.urls import path
from .views import HealthCheck, RegisterView, LoginView

urlpatterns = [
    path('health/', HealthCheck.as_view(), name='health'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
