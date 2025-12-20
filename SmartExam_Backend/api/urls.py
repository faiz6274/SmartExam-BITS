
from django.urls import path
from .views import HealthCheck, RegisterView, ProfileView
from .token_views import MyTokenObtainPairView

urlpatterns = [
    path('health/', HealthCheck.as_view(), name='health'),
    path('register/', RegisterView.as_view(), name='register'),
    # Map /api/login/ to our custom token view so response includes role/username
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
    # Profile endpoint used by the mobile client to fetch role/username
    path('profile/', ProfileView.as_view(), name='profile'),
]
