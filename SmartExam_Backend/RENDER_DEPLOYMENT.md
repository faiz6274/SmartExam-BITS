# SmartExam Backend - Render Deployment Guide

This guide walks you through deploying the SmartExam Django backend to Render.

## Prerequisites

1. **Render Account**: Create a free account at [render.com](https://render.com)
2. **GitHub Repository**: Push your code to GitHub (Render deploys from Git)
3. **Python 3.11+**: Ensure your project targets Python 3.11
4. **Environment Variables**: Prepare your `.env` configuration

## Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure these files are in your repository root (`SmartExam_Backend/`):

- ✅ `requirements.txt` - Updated with production dependencies
- ✅ `Procfile` - Start commands (already created)
- ✅ `render.yaml` - Render configuration (already created)
- ✅ `manage.py` - Django management script
- ✅ `backend/settings.py` - Already configured for Render

### 2. Commit and Push to GitHub

```bash
cd SmartExam_Backend
git add requirements.txt Procfile render.yaml backend/settings.py
git commit -m "Configure for Render deployment"
git push origin main
```

### 3. Create Render Services

#### Option A: Using render.yaml (Recommended)

1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click **"+ New +"** → **"Infrastructure as Code"**
3. Select your GitHub repository
4. Branch: `main`
5. Render will automatically detect `render.yaml` and set up:
   - Web service (Django app)
   - PostgreSQL database
   - Environment variables

#### Option B: Manual Setup

**Create Web Service:**

1. Click **"+ New +"** → **"Web Service"**
2. Select your GitHub repository
3. **Service Name**: `smartexam-backend`
4. **Runtime**: Python 3
5. **Build Command**:
   ```
   pip install --upgrade pip && pip install -r requirements.txt && python manage.py collectstatic --noinput
   ```
6. **Start Command**:
   ```
   gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT --workers 2
   ```
7. **Plan**: Free (or Starter for production)
8. Click **"Deploy"**

**Create Database:**

1. Click **"+ New +"** → **"PostgreSQL"**
2. **Name**: `smartexam-db`
3. **PostgreSQL Version**: 15 (latest)
4. **Plan**: Free (or Standard for production)
5. Click **"Create Database"**

### 4. Configure Environment Variables

In your Render dashboard:

**For Web Service:**

1. Navigate to your web service
2. Go to **Environment** tab
3. Add the following variables:

| Key                       | Value                 | Notes                                                                                                            |
| ------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `DEBUG`                   | `0`                   | Always false in production                                                                                       |
| `DJANGO_SECRET_KEY`       | Generate a new secret | Use `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"` |
| `ALLOWED_HOSTS`           | Your Render domain    | e.g., `smartexam-backend.onrender.com`                                                                           |
| `USE_LOCAL_DB`            | `0`                   | Use PostgreSQL                                                                                                   |
| `DATABASE_URL`            | Auto-linked from DB   | Render will auto-populate this                                                                                   |
| `POSTGRES_SSLMODE`        | `require`             | Secure connection to database                                                                                    |
| `SECURE_SSL_REDIRECT`     | `1`                   | Force HTTPS                                                                                                      |
| `SESSION_COOKIE_SECURE`   | `1`                   | Secure cookies                                                                                                   |
| `CSRF_COOKIE_SECURE`      | `1`                   | Secure CSRF tokens                                                                                               |
| `SECURE_HSTS_SECONDS`     | `31536000`            | HSTS policy (1 year)                                                                                             |
| `CORS_ALLOWED_ORIGINS`    | Frontend URL          | e.g., `https://yourfrontend.onrender.com,exp://your-expo-app`                                                    |
| `AWS_ACCESS_KEY_ID`       | Your AWS key          | If using S3 for media files                                                                                      |
| `AWS_SECRET_ACCESS_KEY`   | Your AWS secret       | If using S3 for media files                                                                                      |
| `AWS_STORAGE_BUCKET_NAME` | Your S3 bucket        | If using S3 for media files                                                                                      |
| `AWS_S3_REGION_NAME`      | `ap-south-1`          | Or your AWS region                                                                                               |

### 5. Link Database to Web Service

1. In your web service, go to the **"Environment"** tab
2. Render should auto-detect your PostgreSQL database
3. The `DATABASE_URL` will be automatically added

### 6. Run Migrations

After deployment, you need to run Django migrations:

**Option A: Using Render Shell**

1. Go to your web service dashboard
2. Click **"Shell"** (top right)
3. Run:
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

**Option B: Via Release Command** (Automatic)
If using `Procfile`, the release command runs migrations automatically:

```
release: python manage.py migrate && python manage.py collectstatic --noinput
```

### 7. Verify Deployment

1. Get your service URL from Render dashboard (e.g., `https://smartexam-backend.onrender.com`)
2. Test endpoints:
   ```bash
   curl https://smartexam-backend.onrender.com/api/health/
   curl https://smartexam-backend.onrender.com/api/token/
   ```
3. Check logs in Render dashboard → **"Logs"** tab

## Troubleshooting

### Common Issues

**1. Build Fails: "No module named 'backend'"**

- Ensure `DJANGO_SETTINGS_MODULE` is set correctly
- Check that `manage.py` is in the project root

**2. Migration Errors**

- Run manually via shell:
  ```bash
  python manage.py migrate --noinput
  ```

**3. Static Files 404**

- Ensure WhiteNoise is in `requirements.txt`
- Run collectstatic:
  ```bash
  python manage.py collectstatic --noinput
  ```

**4. Database Connection Refused**

- Check `DATABASE_URL` environment variable is set
- Verify PostgreSQL service is running
- Wait 2-3 minutes after DB creation before deploying

**5. CORS Errors**

- Add your frontend URL to `CORS_ALLOWED_ORIGINS`
- Include protocol: `https://` not `http://`

### Checking Logs

Navigate to your service → **"Logs"** tab to see:

- Build logs
- Deployment output
- Runtime errors
- Database queries (if DEBUG enabled)

## Production Checklist

- [ ] `DEBUG = 0` in production
- [ ] `DJANGO_SECRET_KEY` is a strong, randomly generated value
- [ ] `ALLOWED_HOSTS` includes your Render domain
- [ ] Database migrations have run successfully
- [ ] Static files are being served
- [ ] HTTPS is enforced
- [ ] CORS origins are configured for your frontend
- [ ] AWS S3 credentials (if using external media storage)
- [ ] Monitoring/logging is set up
- [ ] Backup strategy for database

## Scaling & Production Considerations

### Free Plan Limitations

- Service spins down after 15 minutes of inactivity
- Limited resources
- Not suitable for production

### Upgrade to Production

1. Switch plan to **"Starter"** or **"Standard"** in service settings
2. Upgrade database from **Free** to **Standard** or **Premium**
3. Consider adding background workers for async tasks
4. Set up monitoring and alerts

### Adding Scheduled Tasks

For periodic tasks (e.g., exam cleanup), use:

- **APScheduler** with a background worker
- **Celery** with Redis
- **Render Crons** (create another service with `schedule: "0 * * * *"`)

## Environment Setup for Development

Create a `.env.render` file locally for testing production settings:

```env
DEBUG=0
DJANGO_SECRET_KEY=your-production-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1,smartexam-backend.onrender.com
USE_LOCAL_DB=0
DATABASE_URL=postgresql://user:password@localhost:5432/smartexam
POSTGRES_SSLMODE=disable
SECURE_SSL_REDIRECT=0
SESSION_COOKIE_SECURE=0
CSRF_COOKIE_SECURE=0
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:19001
```

Load it with:

```bash
export $(cat .env.render | xargs)
python manage.py runserver
```

## Support & Resources

- [Render Documentation](https://render.com/docs)
- [Django Deployment Guide](https://docs.djangoproject.com/en/4.2/howto/deployment/)
- [WhiteNoise Documentation](http://whitenoise.evans.io/)
- [Render Status Page](https://status.render.com)

## API Endpoints

After deployment, access your API at:

```
https://smartexam-backend.onrender.com/api/
```

Common endpoints:

- `POST /api/token/` - Get JWT token (login)
- `POST /api/token/refresh/` - Refresh token
- `GET /api/exams/` - List exams
- `GET /api/submissions/` - List submissions
- `POST /api/submissions/` - Submit exam

## Next Steps

1. ✅ Deploy backend
2. 🔄 Deploy frontend to Render/Vercel/Netlify
3. Configure frontend to point to backend URL
4. Test full integration
5. Set up monitoring and logging
6. Configure auto-scaling and backups

---

**Deployment completed successfully!** 🎉

For questions, check Render logs or contact support at [support@render.com](mailto:support@render.com)
