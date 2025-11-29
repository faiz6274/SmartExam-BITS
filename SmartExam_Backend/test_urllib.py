#!/usr/bin/env python
import urllib.request
import json

print("Testing API endpoint with urllib...")
try:
    response = urllib.request.urlopen('http://localhost:8000/api/')
    data = json.loads(response.read().decode())
    print(f"✓ Status: 200")
    print(f"✓ Response: {data}")
except Exception as e:
    print(f"✗ Error: {e}")
