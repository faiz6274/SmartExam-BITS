from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import User, Exam, Question, Submission, SubmissionFile, Comment

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ['id','username','email','password','role']
        read_only_fields = ['id']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user


class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ['id', 'title', 'description', 'instructor', 'duration_minutes', 'passing_score', 'is_published', 'created_at']
        read_only_fields = ['id', 'created_at', 'instructor']


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'exam', 'question_text', 'question_type', 'points', 'order']
        read_only_fields = ['id']


class SubmissionFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubmissionFile
        fields = ['id', 'file', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at']


class SubmissionSerializer(serializers.ModelSerializer):
    files = SubmissionFileSerializer(many=True, read_only=True)
    
    class Meta:
        model = Submission
        fields = ['id', 'exam', 'student', 'status', 'score', 'submitted_at', 'files', 'created_at']
        read_only_fields = ['id', 'created_at', 'submitted_at', 'student']


class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'submission', 'author', 'author_name', 'text', 'created_at']
        read_only_fields = ['id', 'created_at', 'author']
