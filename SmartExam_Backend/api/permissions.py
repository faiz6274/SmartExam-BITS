from rest_framework import permissions

class IsInstructor(permissions.BasePermission):
    """Allow access only to instructors ."""
    def has_permission(self, request, view):
        user = request.user
        return bool(user and user.is_authenticated and (getattr(user, 'role', None) == 'instructor' or user.is_superuser))

class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return bool(user and user.is_authenticated and getattr(user, 'role', None) == 'student')
