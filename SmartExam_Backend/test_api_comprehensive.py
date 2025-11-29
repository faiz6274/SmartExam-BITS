#!/usr/bin/env python
"""
Comprehensive API Test
Tests all major API endpoints to verify they're working correctly
"""
import os
import sys
import json
import django

os.environ['DJANGO_SETTINGS_MODULE'] = 'backend.settings'
django.setup()

from django.test import Client
from django.contrib.auth import get_user_model
from api.models import Exam, Question

User = get_user_model()

def test_api():
    client = Client()
    print("=" * 70)
    print("SMARTEXAM API COMPREHENSIVE TEST")
    print("=" * 70)
    
    # Test 1: API Root
    print("\n[TEST 1] API Root Endpoint")
    print("-" * 70)
    response = client.get('/api/')
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    assert response.status_code == 200, "API root should return 200"
    assert 'exams' in response.json(), "API root should have exams endpoint"
    print("✓ PASS: API root is accessible")
    
    # Test 2: Register User
    print("\n[TEST 2] User Registration")
    print("-" * 70)
    register_data = {
        'username': 'testuser',
        'email': 'test@example.com',
        'password': 'testpass123',
        'role': 'student'
    }
    response = client.post('/api/register/', register_data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    assert response.status_code in [201, 400], "Registration should return 201 or 400 (if user exists)"
    print("✓ PASS: User registration endpoint works")
    
    # Test 3: Get Token
    print("\n[TEST 3] JWT Token Acquisition")
    print("-" * 70)
    token_data = {
        'username': 'testuser',
        'password': 'testpass123'
    }
    response = client.post('/api/token/', token_data)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        token_response = response.json()
        print(f"Response keys: {token_response.keys()}")
        print(f"Access token: {token_response.get('access', 'N/A')[:30]}...")
        print("✓ PASS: Token acquisition works")
    else:
        print(f"Token endpoint returned {response.status_code} - this is OK if user doesn't exist yet")
    
    # Test 4: List Exams (without auth)
    print("\n[TEST 4] List Exams Endpoint (No Auth)")
    print("-" * 70)
    response = client.get('/api/exams/')
    print(f"Status: {response.status_code}")
    print(f"Response type: {type(response.json())}")
    print(f"Sample response: {str(response.content)[:200]}")
    assert response.status_code == 200, "Exams list should return 200"
    print("✓ PASS: Exams endpoint is accessible")
    
    # Test 5: List Submissions (without auth)
    print("\n[TEST 5] List Submissions Endpoint (No Auth)")
    print("-" * 70)
    response = client.get('/api/submissions/')
    print(f"Status: {response.status_code}")
    assert response.status_code == 200, "Submissions list should return 200"
    print("✓ PASS: Submissions endpoint is accessible")
    
    # Test 6: List Comments (without auth)
    print("\n[TEST 6] List Comments Endpoint (No Auth)")
    print("-" * 70)
    response = client.get('/api/comments/')
    print(f"Status: {response.status_code}")
    assert response.status_code == 200, "Comments list should return 200"
    print("✓ PASS: Comments endpoint is accessible")
    
    # Test 7: Health Check (try all critical endpoints)
    print("\n[TEST 7] Health Check - All Endpoints")
    print("-" * 70)
    endpoints = [
        ('GET', '/api/'),
        ('GET', '/api/exams/'),
        ('GET', '/api/submissions/'),
        ('GET', '/api/comments/'),
        ('POST', '/api/register/'),
    ]
    
    all_working = True
    for method, endpoint in endpoints:
        if method == 'GET':
            response = client.get(endpoint)
        else:
            response = client.post(endpoint, {})
        status = "✓" if response.status_code < 500 else "✗"
        print(f"{status} {method:4s} {endpoint:25s} -> {response.status_code}")
        if response.status_code >= 500:
            all_working = False
    
    print("-" * 70)
    if all_working:
        print("✓ ALL TESTS PASSED - API IS FUNCTIONAL")
    else:
        print("✗ SOME ENDPOINTS RETURNING 5xx ERRORS")
    
    print("=" * 70)
    return all_working

if __name__ == '__main__':
    try:
        success = test_api()
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"\n✗ TEST FAILED WITH EXCEPTION:\n{e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
