from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Exam, Question, Submission, SubmissionFile, Comment

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Role', {'fields': ('role',)}),
    )
    list_display = ('username', 'email', 'role', 'is_staff', 'is_active')


@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = ('title', 'instructor', 'duration_minutes', 'is_published', 'created_at')
    list_filter = ('is_published', 'created_at')
    search_fields = ('title', 'description')


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question_text', 'exam', 'question_type', 'points', 'order')
    list_filter = ('question_type', 'exam')
    search_fields = ('question_text',)


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('student', 'exam', 'status', 'score', 'submitted_at')
    list_filter = ('status', 'submitted_at')
    search_fields = ('student__username', 'exam__title')


@admin.register(SubmissionFile)
class SubmissionFileAdmin(admin.ModelAdmin):
    list_display = ('submission', 'uploaded_at')
    list_filter = ('uploaded_at',)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'submission', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('text', 'author__username')
