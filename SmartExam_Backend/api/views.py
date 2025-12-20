
from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
from .serializers import UserSerializer
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import SubmissionSerializer
from .models import Submission, SubmissionFile, Exam

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email,
            'role': getattr(user, 'role', None)
        })


class HealthCheck(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return JsonResponse({'status': 'ok'})


class SubmissionCreateView(generics.CreateAPIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]
    serializer_class = SubmissionSerializer

    def post(self, request, *args, **kwargs):
        # Expecting: files in request.FILES.getlist('documents'), and fields: exam, page_count, submitted_at
        user = request.user
        exam_id = request.data.get('exam')
        if not exam_id:
            return JsonResponse({'detail': 'Missing exam id'}, status=400)

        try:
            exam = Exam.objects.get(pk=int(exam_id))
        except Exam.DoesNotExist:
            return JsonResponse({'detail': 'Exam not found'}, status=404)

        # prevent duplicate submission if unique_together enforced
        if Submission.objects.filter(exam=exam, student=user).exists():
            return JsonResponse({'detail': 'Submission already exists for this exam and student'}, status=400)

        page_count = int(request.data.get('page_count') or 0)
        submitted_at = request.data.get('submitted_at') or None

        submission = Submission.objects.create(
            exam=exam,
            student=user,
            page_count=page_count,
            submitted_at=submitted_at,
            status='submitted'
        )

        files = request.FILES.getlist('documents')
        for f in files:
            SubmissionFile.objects.create(submission=submission, file=f)

        serialized = SubmissionSerializer(submission, context={'request': request})
        return JsonResponse(serialized.data, status=201, safe=False)
