#!/usr/bin/env python
import os
import sys
import django

os.environ['DJANGO_SETTINGS_MODULE'] = 'backend.settings'
django.setup()

from django.test import Client
from django.test.utils import setup_test_environment, teardown_test_environment

setup_test_environment()

client = Client()

print("=" * 60)
print("Testing /api/ endpoint")
print("=" * 60)

try:
    response = client.get('/api/', HTTP_HOST='localhost:8000')
    print(f"Status Code: {response.status_code}")
    print(f"Content-Type: {response.get('Content-Type')}")
    print(f"Response Content:\n{response.content.decode()}")
    if response.status_code >= 400:
        if hasattr(response, 'exc_info') and response.exc_info:
            print(f"\nException Info:\n{response.exc_info}")
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()

teardown_test_environment()
