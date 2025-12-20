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
        extra_kwargs = {
            'username': {'validators': []},
            'email': {'validators': []},
        }

    def validate(self, data):
        """Batch validation to reduce database queries"""
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        errors = {}
        
        # Username validation
        if username:
            if len(username) < 3:
                errors['username'] = "Username must be at least 3 characters."
            elif len(username) > 30:
                errors['username'] = "Username must be at most 30 characters."
            elif User.objects.filter(username=username).exists():
                errors['username'] = "This username is already taken."
        
        # Email validation
        if email:
            if '@' not in email or '.' not in email.split('@')[-1]:
                errors['email'] = "Please enter a valid email address."
            elif User.objects.filter(email=email).exists():
                errors['email'] = "This email is already registered."
        
        # Password validation (simplified for speed)
        if password:
            if len(password) < 8:
                errors['password'] = "Password must be at least 8 characters."
        
        if errors:
            raise serializers.ValidationError(errors)
        
        return data

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
    student_name = serializers.CharField(source='student.username', read_only=True)
    comments = serializers.SerializerMethodField()
    
    class Meta:
        model = Submission
        fields = ['id', 'exam', 'student', 'student_name', 'status', 'score', 'submitted_at', 'files', 'comments', 'page_count', 'created_at']
        read_only_fields = ['id', 'created_at', 'submitted_at', 'student']
    
    def get_comments(self, obj):
        comments = obj.comments.all()
        return CommentSerializer(comments, many=True).data


class ExamSerializer(serializers.ModelSerializer):
    instructor_name = serializers.CharField(source='instructor.username', read_only=True)
    
    class Meta:
        model = Exam
        fields = ['id', 'title', 'description', 'instructor', 'instructor_name', 'created_at', 'duration_minutes', 'passing_score', 'is_published']
        read_only_fields = ['id', 'created_at', 'instructor']


class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'submission', 'author', 'author_name', 'text', 'created_at']
        read_only_fields = ['id', 'created_at', 'author']
