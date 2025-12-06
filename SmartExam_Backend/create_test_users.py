#!/usr/bin/env python
"""
Create test users for SmartExam
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# Test users to create
test_users = [
    {
        'username': 'irfan',
        'email': 'irfan@example.com',
        'password': 'Irfan123!',
        'role': 'student'
    },
    {
        'username': 'instructor1',
        'email': 'instructor@example.com',
        'password': 'Instructor123!',
        'role': 'instructor'
    },
    {
        'username': 'student1',
        'email': 'student@example.com',
        'password': 'Student123!',
        'role': 'student'
    },
]

print("Creating test users...\n")

for user_data in test_users:
    username = user_data['username']
    email = user_data['email']
    password = user_data['password']
    role = user_data['role']
    
    # Check if user exists
    if User.objects.filter(username=username).exists():
        print(f"✓ User '{username}' already exists")
        continue
    
    # Create user
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        role=role
    )
    print(f"✓ Created user: {username} ({role})")
    print(f"  Email: {email}")
    print(f"  Password: {password}\n")

print("\nAll test users ready!")
print("\nTest Credentials:")
for user_data in test_users:
    print(f"  • {user_data['username']} / {user_data['password']} ({user_data['role']})")
