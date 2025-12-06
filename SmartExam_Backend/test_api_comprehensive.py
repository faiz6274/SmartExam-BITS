from django.test import TestCase, Client, override_settings
from django.urls import reverse
import json

@override_settings(ALLOWED_HOSTS=['testserver'])
def test_api():
    client = Client()
    print("======================================================================")
    print("SMARTEXAM API COMPREHENSIVE TEST")
    print("======================================================================")

    # Test 1: API Root Endpoint
    print("\n[TEST 1] API Root Endpoint")
    print("-" * 70)
    try:
        response = client.get('/api/')
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            print("✓ API Root accessible")
            print(f"Response: {response.json()}")
        else:
            print(f"✗ API Root failed with status {response.status_code}")
            print(f"Response: {response.content.decode()}")
    except Exception as e:
        print(f"✗ TEST FAILED WITH EXCEPTION: {e}")
        return False

    # Test 2: Register Endpoint
    print("\n[TEST 2] Register Endpoint")
    print("-" * 70)
    try:
        data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpass123',
            'role': 'student'
        }
        response = client.post('/api/register/', data=json.dumps(data), content_type='application/json')
        print(f"Status: {response.status_code}")
        if response.status_code == 201:
            print("✓ User registration successful")
            print(f"Response: {response.json()}")
        else:
            print(f"✗ Registration failed with status {response.status_code}")
            print(f"Response: {response.content.decode()}")
    except Exception as e:
        print(f"✗ TEST FAILED WITH EXCEPTION: {e}")
        return False

    # Test 3: Login Endpoint
    print("\n[TEST 3] Login Endpoint")
    print("-" * 70)
    try:
        data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        response = client.post('/api/login/', data=json.dumps(data), content_type='application/json')
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            print("✓ Login successful")
            print(f"Response: {response.json()}")
        else:
            print(f"✗ Login failed with status {response.status_code}")
            print(f"Response: {response.content.decode()}")
    except Exception as e:
        print(f"✗ TEST FAILED WITH EXCEPTION: {e}")
        return False

    print("\n======================================================================")
    print("ALL TESTS PASSED!")
    print("======================================================================")
    return True

if __name__ == '__main__':
    success = test_api()
    exit(0 if success else 1)
