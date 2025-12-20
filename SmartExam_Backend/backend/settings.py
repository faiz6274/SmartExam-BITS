import os
from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv

# ------------------------------------------------------------
# Load environment variables from .env in project root
# ------------------------------------------------------------
load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# ------------------------------------------------------------
# Core / Debug
# ------------------------------------------------------------
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "dev-secret")
DEBUG = os.getenv("DEBUG", "1").lower() in ("1", "true", "yes")

# Allowed hosts
if DEBUG:
    ALLOWED_HOSTS = ["*", "testserver"]
else:
    # Default includes your EC2 IP and public DNS
    default_hosts = "13.200.180.132,ec2-13-200-180-132.ap-south-1.compute.amazonaws.com,localhost,127.0.0.1"
    ALLOWED_HOSTS = [
        h.strip() for h in os.getenv("ALLOWED_HOSTS", default_hosts).split(",") if h.strip()
    ]

# ------------------------------------------------------------
# Installed apps
# ------------------------------------------------------------
INSTALLED_APPS = [
    # Django
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third-party
    "rest_framework",
    "rest_framework_simplejwt.token_blacklist",
    "corsheaders",
    "storages",

    # Local
    "api",
]

# ------------------------------------------------------------
# Middleware
# ------------------------------------------------------------
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    # Token-based mobile/API → CSRF not required
    # "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
]

ROOT_URLCONF = "backend.urls"
APPEND_SLASH = False  # keep REST endpoints exact (no trailing-slash redirects)

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],  # optional
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"

# ------------------------------------------------------------
# Database (SQLite for local; RDS for prod)
# ------------------------------------------------------------
USE_LOCAL_DB = os.getenv("USE_LOCAL_DB", "true").lower() in ("1", "true", "yes")

if USE_LOCAL_DB:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
            "OPTIONS": {
                "timeout": 20,
                "check_same_thread": False,
            },
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",   # Psycopg 3 works with this backend
            "NAME": os.getenv("POSTGRES_DB", "smartexam"),
            "USER": os.getenv("POSTGRES_USER", "admin"),
            "PASSWORD": os.getenv("POSTGRES_PASSWORD", ""),
            "HOST": os.getenv("POSTGRES_HOST", "smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com"),
            "PORT": os.getenv("POSTGRES_PORT", "5432"),
            # TLS to RDS is recommended; it's separate from web HTTPS
            "OPTIONS": {"sslmode": os.getenv("POSTGRES_SSLMODE", "require")},
            # Reuse DB connections (seconds). Set 0 to disable.
            "CONN_MAX_AGE": int(os.getenv("DB_CONN_MAX_AGE", "60")),
        }
    }

# ------------------------------------------------------------
# Password validators
# (You validate in serializers; keeping defaults off is fine)
# ------------------------------------------------------------
AUTH_PASSWORD_VALIDATORS = []

# ------------------------------------------------------------
# I18N / TZ
# ------------------------------------------------------------
LANGUAGE_CODE = "en-us"
TIME_ZONE = os.getenv("TIME_ZONE", "UTC")
USE_I18N = True
USE_TZ = True
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ------------------------------------------------------------
# Static & Media (Nginx will serve STATIC_ROOT)
# ------------------------------------------------------------
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
# Optional local static dir for dev
STATICFILES_DIRS = [BASE_DIR / "static"] if (BASE_DIR / "static").exists() else []

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# ------------------------------------------------------------
# AWS S3 (optional)
# If AWS_STORAGE_BUCKET_NAME is set, use S3 for uploads
# ------------------------------------------------------------
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')
AWS_S3_REGION_NAME = os.getenv('AWS_S3_REGION_NAME', None)
AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com" if AWS_STORAGE_BUCKET_NAME else None
AWS_DEFAULT_ACL = None
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage' if AWS_STORAGE_BUCKET_NAME else 'django.core.files.storage.FileSystemStorage'

# ------------------------------------------------------------
# Auth model
# ------------------------------------------------------------
AUTH_USER_MODEL = "api.User"

# ------------------------------------------------------------
# DRF & JWT
# ------------------------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.AllowAny",  # tighten later if needed
    ),
    "DEFAULT_RENDERER_CLASSES": ("rest_framework.renderers.JSONRenderer",),
    "DEFAULT_PARSER_CLASSES": ("rest_framework.parsers.JSONParser",),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=int(os.getenv("JWT_ACCESS_MINUTES", "30"))),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=int(os.getenv("JWT_REFRESH_DAYS", "7"))),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
}

# ------------------------------------------------------------
# CORS
# ------------------------------------------------------------
# Allow overriding via environment variable; default to DEBUG behavior.
CORS_ALLOW_ALL_ORIGINS = os.getenv("CORS_ALLOW_ALL_ORIGINS", str(DEBUG)).lower() in ("1", "true", "yes")
if not CORS_ALLOW_ALL_ORIGINS:
    # EC2 HTTP only (no domain/https) - include current known origins by default
    default_cors = "http://13.200.180.132,http://ec2-13-200-180-132.ap-south-1.compute.amazonaws.com,http://localhost:3000,http://localhost:19001"
    CORS_ALLOWED_ORIGINS = [
        o.strip() for o in os.getenv("CORS_ALLOWED_ORIGINS", default_cors).split(",") if o.strip()
    ]
# If you need extra headers
CORS_ALLOW_HEADERS = [
    "authorization",
    "content-type",
    "accept",
    "origin",
    "user-agent",
]

CORS_ALLOW_CREDENTIALS = False  # set True only if you use cookies

# ------------------------------------------------------------
# Security
# ------------------------------------------------------------
# Enable secure cookies when running behind HTTPS in production
SESSION_COOKIE_SECURE = os.getenv("SESSION_COOKIE_SECURE", "0").lower() in ("1", "true", "yes")
CSRF_COOKIE_SECURE = os.getenv("CSRF_COOKIE_SECURE", "0").lower() in ("1", "true", "yes")
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")  # harmless even on HTTP

# ------------------------------------------------------------
# Cache
# ------------------------------------------------------------
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "smartexam-cache",
        "TIMEOUT": int(os.getenv("CACHE_TIMEOUT", "300")),
    }
}

# ------------------------------------------------------------
# Logging
# ------------------------------------------------------------
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {"console": {"class": "logging.StreamHandler"}},
    "root": {"handlers": ["console"], "level": "WARNING"},
    "loggers": {"django": {"handlers": ["console"], "level": "WARNING", "propagate": False}},
}
