#!/usr/bin/env python
import os
import sys
import django
from django.core.management import call_command

os.chdir('C:\\Users\\muham\\Downloads\\SmartExam-BITS\\SmartExam_Backend')
sys.path.insert(0, 'C:\\Users\\muham\\Downloads\\SmartExam-BITS\\SmartExam_Backend')
os.environ['DJANGO_SETTINGS_MODULE'] = 'backend.settings'
django.setup()

if __name__ == '__main__':
    call_command('runserver', '--noreload', '0.0.0.0:8000')
