from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import User, Exam, Question, Submission, SubmissionFile, Comment
import re

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ['id','username','email','password','role']
        read_only_fields = ['id']

    def validate_username(self, value):
        """Validate username: 3-30 chars, alphanumeric and underscore only"""
        if len(value) < 3:
            raise serializers.ValidationError("Username must be at least 3 characters long.")
        if len(value) > 30:
            raise serializers.ValidationError("Username must be at most 30 characters long.")
        if not re.match(r'^[a-zA-Z0-9_]+$', value):
            raise serializers.ValidationError("Username can only contain letters, numbers, and underscores.")
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def validate_email(self, value):
        """Validate email format and uniqueness"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        if '@' not in value or '.' not in value.split('@')[-1]:
            raise serializers.ValidationError("Please enter a valid email address.")
        return value

    def validate_password(self, value):
        """Validate password requirements: 8+ chars, uppercase, number, special char"""
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        if not any(c.isupper() for c in value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")
        if not any(c.isdigit() for c in value):
            raise serializers.ValidationError("Password must contain at least one number.")
        if not any(c in '!@#$%^&*()_+-=[]{};\':"|,.<>?' for c in value):
            raise serializers.ValidationError("Password must contain at least one special character.")
        return value

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
