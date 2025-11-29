from django.urls import path, include
from rest_framework import routers
from .views import ExamViewSet, SubmissionViewSet, CommentViewSet, RegisterView

router = routers.DefaultRouter()
router.register(r'exams', ExamViewSet, basename='exams')
router.register(r'submissions', SubmissionViewSet, basename='submissions')
router.register(r'comments', CommentViewSet, basename='comments')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
]
