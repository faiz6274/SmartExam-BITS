#!/usr/bin/env python
import os
import sys
import subprocess

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    
    # Run runserver
    from django.core.management import execute_from_command_line
    
    execute_from_command_line(['manage.py', 'runserver', '0.0.0.0:8000'])
