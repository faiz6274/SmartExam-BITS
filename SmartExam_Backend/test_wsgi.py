#!/usr/bin/env python
import os
import sys
import django
from io import BytesIO

os.environ['DJANGO_SETTINGS_MODULE'] = 'backend.settings'
django.setup()

from backend.wsgi import application

# Simulate a simple HTTP GET request to /api/
environ = {
    'REQUEST_METHOD': 'GET',
    'SCRIPT_NAME': '',
    'PATH_INFO': '/api/',
    'QUERY_STRING': '',
    'CONTENT_TYPE': '',
    'CONTENT_LENGTH': '0',
    'SERVER_NAME': 'localhost',
    'SERVER_PORT': '8000',
    'SERVER_PROTOCOL': 'HTTP/1.1',
    'wsgi.version': (1, 0),
    'wsgi.url_scheme': 'http',
    'wsgi.input': BytesIO(),
    'wsgi.errors': sys.stderr,
    'wsgi.multithread': False,
    'wsgi.multiprocess': True,
    'wsgi.run_once': False,
    'HTTP_HOST': 'localhost:8000',
    'HTTP_ACCEPT': 'application/json',
}

response_headers = []
status = []

def start_response(resp_status, resp_headers):
    status.append(resp_status)
    response_headers.extend(resp_headers)
    return lambda x: None

print("=" * 60)
print("Testing WSGI application /api/ endpoint")
print("=" * 60)

try:
    response = application(environ, start_response)
    print(f"Status: {status[0] if status else 'No status'}")
    print(f"Headers: {response_headers}")
    content = b''.join(response)
    print(f"Response Content:\n{content.decode()}")
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
