from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .models import Exam, Question, Submission, SubmissionFile, Comment
from .serializers import (
    UserSerializer, ExamSerializer, QuestionSerializer, 
    SubmissionSerializer, SubmissionFileSerializer, CommentSerializer
)

User = get_user_model()


def get_role(user):
    """Helper: return 'student' / 'instructor' / 'admin' or None."""
    if not user or not user.is_authenticated:
        return None
    return getattr(user, "role", None)


class RegisterView(APIView):
    """Register a new user."""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ExamViewSet(viewsets.ModelViewSet):
    """Exam management."""
    queryset = Exam.objects.all().prefetch_related('questions')
    serializer_class = ExamSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        role = get_role(user)
        # Instructors see their own exams and published exams
        if role == 'instructor':
            return Exam.objects.filter(instructor=user) | Exam.objects.filter(is_published=True)
        # Students see only published exams
        if role == 'student':
            return Exam.objects.filter(is_published=True)
        # Admin/superuser sees all
        return Exam.objects.all()
    
    def perform_create(self, serializer):
        role = get_role(self.request.user)
        if role != 'instructor' and not self.request.user.is_superuser:
            raise PermissionDenied("Only instructors can create exams.")
        serializer.save(instructor=self.request.user)
    
    def perform_update(self, serializer):
        obj = self.get_object()
        role = get_role(self.request.user)
        if obj.instructor_id != self.request.user.id and not self.request.user.is_superuser:
            raise PermissionDenied("Only the instructor can update this exam.")
        serializer.save()
    
    @action(detail=True, methods=['get'])
    def questions(self, request, pk=None):
        """Get all questions for an exam."""
        exam = self.get_object()
        questions = exam.questions.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)


class SubmissionViewSet(viewsets.ModelViewSet):
    """Submission management."""
    queryset = Submission.objects.all().prefetch_related('files', 'comments')
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        role = get_role(user)
        # Instructors see all submissions
        if user.is_superuser or role == 'instructor':
            return Submission.objects.all().prefetch_related('files', 'comments')
        # Students see only their own
        return Submission.objects.filter(student=user).prefetch_related('files', 'comments')
    
    def perform_create(self, serializer):
        role = get_role(self.request.user)
        if role != 'student' and not self.request.user.is_superuser:
            raise PermissionDenied("Only students can create submissions.")
        serializer.save(student=self.request.user)
    
    def get_object(self):
        obj = super().get_object()
        user = self.request.user
        role = get_role(user)
        if user.is_superuser or role == 'instructor':
            return obj
        if obj.student_id != user.id:
            raise PermissionDenied("You do not have permission to access this submission.")
        return obj
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def upload_files(self, request, pk=None):
        """Upload files to a submission."""
        submission = self.get_object()
        files = request.FILES.getlist('files')
        if not files:
            return Response({'detail': 'No files provided.'}, status=status.HTTP_400_BAD_REQUEST)
        
        role = get_role(request.user)
        if (submission.student_id != request.user.id) and (role != 'instructor') and not request.user.is_superuser:
            raise PermissionDenied("You can only upload files to your own submission.")
        
        created = []
        for f in files:
            sf = SubmissionFile.objects.create(submission=submission, file=f)
            created.append(sf.id)
        
        return Response({'files_uploaded': len(created), 'file_ids': created}, status=status.HTTP_201_CREATED)


class CommentViewSet(viewsets.ModelViewSet):
    """Comment management."""
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        role = get_role(user)
        # Instructors see all comments
        if user.is_superuser or role == 'instructor':
            return Comment.objects.all()
        # Students see comments on their submissions
        return Comment.objects.filter(submission__student=user)
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
