# SmartExam - Django REST Backend (Scaffold)

This scaffold provides a production-aware Django + DRF backend for SmartExam:
- JWT authentication (djangorestframework-simplejwt)
- Models: Exam, Question, Submission, SubmissionFile, Comment
- AWS S3 storage (django-storages[boto3])
- Optional image->PDF conversion task (sync example). For async use Celery.
- PostgreSQL config via environment variables
- Dockerfile + docker-compose.yml for local development

## Quick start (local dev)
1. Copy `.env.example` to `.env` and fill values.
2. Build & run with Docker Compose:
   ```
   docker-compose up --build
   ```
3. Run migrations:
   ```
   docker-compose exec web python manage.py migrate
   docker-compose exec web python manage.py createsuperuser
   ```

## Notes
- Replace AWS credentials and bucket name in `.env`.
- For production, configure secure settings, HTTPS, and proper allowed hosts.
