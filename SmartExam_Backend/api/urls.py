
from django.urls import path
from .views import HealthCheck, RegisterView, ProfileView, ExamListView, ExamCreateView, SubmissionListView
from .token_views import MyTokenObtainPairView
from .views import SubmissionCreateView

urlpatterns = [
    path('health/', HealthCheck.as_view(), name='health'),
    path('register/', RegisterView.as_view(), name='register'),
    # Map /api/login/ to our custom token view so response includes role/username
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
    # Profile endpoint used by the mobile client to fetch role/username
    path('profile/', ProfileView.as_view(), name='profile'),
    # Submissions endpoint for uploading/retrieving scanned documents
    path('submissions/', SubmissionListView.as_view(), name='submissions-list'),
    path('submissions/create/', SubmissionCreateView.as_view(), name='submissions-create'),
    # Exam endpoints
    path('exams/', ExamListView.as_view(), name='exams'),
    path('exams/create/', ExamCreateView.as_view(), name='exam-create'),
]
