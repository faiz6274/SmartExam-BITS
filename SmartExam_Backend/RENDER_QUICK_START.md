# Render Deployment - Quick Start Checklist

## Pre-Deployment Setup (5 minutes)

- [ ] Have a GitHub account with your code pushed
- [ ] Create a [Render account](https://render.com) (free)
- [ ] Install PostgreSQL locally for testing (optional)

## Verify Files Exist

Navigate to `SmartExam_Backend/` and confirm:

- [ ] `requirements.txt` - Contains all Python dependencies
- [ ] `Procfile` - Contains build/start commands
- [ ] `render.yaml` - Contains Render configuration
- [ ] `manage.py` - Django management script
- [ ] `backend/settings.py` - Django settings (updated)
- [ ] `backend/wsgi.py` - WSGI entry point
- [ ] `Dockerfile` - Docker configuration (optional but good to have)

## Generate Required Secrets

Open a terminal in the project directory and run:

```bash
python render_helper.py
```

This will generate a `DJANGO_SECRET_KEY`. Save it for later.

Or visit: https://djecrety.ir/ to generate one.

## Deploy to Render (Step-by-Step)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### Step 2: Create Web Service

1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click **"+ New +"** → **"Web Service"**
3. Select your repository
4. Fill in:
   - **Service Name**: `smartexam-backend`
   - **Branch**: `main`
   - **Runtime**: `Python 3`
   - **Build Command**:
     ```
     pip install --upgrade pip && pip install -r requirements.txt && python manage.py collectstatic --noinput
     ```
   - **Start Command**:
     ```
     gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT --workers 2
     ```
   - **Plan**: Free (or upgrade later)

### Step 3: Create Database

1. Click **"+ New +"** → **"PostgreSQL"**
2. Fill in:
   - **Name**: `smartexam-db`
   - **Database**: `smartexam`
   - **User**: `postgres`
   - **Plan**: Free (or Standard for production)
3. Note the connection string (shows after creation)

### Step 4: Configure Environment Variables

In your web service settings, go to **Environment** and add:

| Key                     | Value                            | Copy From                           |
| ----------------------- | -------------------------------- | ----------------------------------- |
| `DEBUG`                 | `0`                              | Static                              |
| `DJANGO_SECRET_KEY`     | `your-generated-key`             | render_helper.py output             |
| `ALLOWED_HOSTS`         | `smartexam-backend.onrender.com` | Will change to your URL             |
| `USE_LOCAL_DB`          | `0`                              | Static                              |
| `DATABASE_URL`          | Auto-linked                      | Render will populate                |
| `POSTGRES_SSLMODE`      | `require`                        | Static                              |
| `SECURE_SSL_REDIRECT`   | `1`                              | Static                              |
| `SESSION_COOKIE_SECURE` | `1`                              | Static                              |
| `CSRF_COOKIE_SECURE`    | `1`                              | Static                              |
| `SECURE_HSTS_SECONDS`   | `31536000`                       | Static                              |
| `CORS_ALLOWED_ORIGINS`  | Your frontend URL                | e.g., https://frontend.onrender.com |

### Step 5: Deploy

1. Click **"Deploy"** button
2. Wait for build to complete (usually 2-5 minutes)
3. Check build logs for errors
4. Once "Live" appears, your service is deployed!

### Step 6: Run Migrations

1. Go back to web service dashboard
2. Click **"Shell"** (top right)
3. Run:
   ```bash
   python manage.py migrate
   python manage.py createsuperuser  # Create admin user
   ```
4. Exit shell

### Step 7: Test Your API

Get your service URL (e.g., `https://smartexam-backend.onrender.com`)

Test endpoints:

```bash
# Get API root
curl https://smartexam-backend.onrender.com/api/

# Get token (login)
curl -X POST https://smartexam-backend.onrender.com/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'

# List exams
curl https://smartexam-backend.onrender.com/api/exams/ \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Troubleshooting

### Service won't start

- Check **Logs** tab
- Common issues:
  - Missing dependencies in `requirements.txt`
  - Wrong `DJANGO_SETTINGS_MODULE`
  - Database not yet created

### Migration fails

- Run in **Shell**:
  ```bash
  python manage.py migrate --verbosity 2
  ```
- Check database connection

### Static files 404

- Ensure `python manage.py collectstatic` runs
- Check WhiteNoise is in requirements.txt

### CORS errors

- Add frontend URL to `CORS_ALLOWED_ORIGINS`
- Include full protocol: `https://domain.com`

## Update ALLOWED_HOSTS

After deployment, Render assigns your service a URL. Update:

1. Go to web service **Environment** tab
2. Find `ALLOWED_HOSTS`
3. Change to: `smartexam-backend-abc123.onrender.com` (your actual URL)
4. Save

## Verify Deployment

✅ Service shows "Live" in dashboard
✅ Can access API at your URL
✅ Database migrations completed
✅ Static files loading
✅ Admin user created
✅ CORS configured for frontend

## Next Steps

1. Deploy frontend to Render/Vercel/Netlify
2. Update frontend to use your new backend URL
3. Test full integration
4. Monitor logs for errors
5. Set up auto-backups
6. Consider upgrading to paid plan for production

## Important Notes

- **Free plan sleeps after 15 minutes** - Use starter plan for production
- **Change SECRET_KEY in Render, not in code** - Never commit secrets
- **Keep Render updated** - Database/Python updates are automatic
- **Use HTTPS always** - Render enforces this

## Getting Help

- **Render Docs**: https://render.com/docs
- **Logs**: Check your service's Logs tab
- **Render Support**: support@render.com
- **GitHub Status**: https://www.githubstatus.com

---

**Estimated time to deployment: 15-20 minutes** ⏱️

**All set!** Your Django backend is now running on Render! 🚀
