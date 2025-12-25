#!/usr/bin/env python
"""
Render Deployment Helper Script
Generates necessary values for Render deployment configuration
"""

import os
import sys
from pathlib import Path

def generate_django_secret_key():
    """Generate a secure Django secret key"""
    from django.core.management.utils import get_random_secret_key
    return get_random_secret_key()

def print_render_env_template():
    """Print environment variables needed for Render"""
    print("\n" + "="*60)
    print("RENDER DEPLOYMENT - ENVIRONMENT VARIABLES")
    print("="*60 + "\n")
    
    print("Copy these to your Render Dashboard under Environment Variables:\n")
    
    print("1. Generate a secure DJANGO_SECRET_KEY:")
    print("   " + generate_django_secret_key())
    
    print("\n2. Set these required variables:")
    vars_required = {
        "DEBUG": "0",
        "USE_LOCAL_DB": "0",
        "POSTGRES_SSLMODE": "require",
        "SECURE_SSL_REDIRECT": "1",
        "SESSION_COOKIE_SECURE": "1",
        "CSRF_COOKIE_SECURE": "1",
        "SECURE_HSTS_SECONDS": "31536000",
    }
    for key, value in vars_required.items():
        print(f"   {key}={value}")
    
    print("\n3. Update these after deployment:")
    vars_custom = {
        "ALLOWED_HOSTS": "smartexam-backend.onrender.com",
        "CORS_ALLOWED_ORIGINS": "https://your-frontend-url.onrender.com",
    }
    for key, value in vars_custom.items():
        print(f"   {key}={value}")
    
    print("\n4. Add if using AWS S3:")
    vars_aws = {
        "AWS_ACCESS_KEY_ID": "your-aws-key",
        "AWS_SECRET_ACCESS_KEY": "your-aws-secret",
        "AWS_STORAGE_BUCKET_NAME": "your-bucket",
        "AWS_S3_REGION_NAME": "ap-south-1",
    }
    for key, value in vars_aws.items():
        print(f"   {key}={value}")
    
    print("\n" + "="*60)
    print("Next Steps:")
    print("  1. Push changes to GitHub")
    print("  2. Go to render.com/dashboard")
    print("  3. Click '+ New' → 'Web Service'")
    print("  4. Select your repository")
    print("  5. Set environment variables above")
    print("  6. Click 'Deploy'")
    print("="*60 + "\n")

if __name__ == "__main__":
    # Add Django settings to path if running from project directory
    project_root = Path(__file__).parent
    sys.path.insert(0, str(project_root))
    
    # Set Django settings module
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
    
    try:
        import django
        django.setup()
        print_render_env_template()
    except Exception as e:
        print(f"Note: Run this from the project root with: python render_helper.py")
        print(f"Error: {e}")
        print("\nManually generate a secret key at:")
        print("https://djecrety.ir/")
