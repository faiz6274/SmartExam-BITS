# Render Deployment - Troubleshooting Guide

Quick solutions to common issues during and after deployment.

## Build & Deployment Issues

### Build Fails: "ModuleNotFoundError: No module named 'backend'"

**Cause**: Django settings module not found

**Solution**:

1. Verify `manage.py` is in project root
2. Check `DJANGO_SETTINGS_MODULE` in build command
3. Ensure `backend` directory exists with `__init__.py`

```bash
# Should show these files in SmartExam_Backend/
ls manage.py
ls backend/settings.py
ls backend/__init__.py
```

### Build Fails: "No such file or directory: 'requirements.txt'"

**Cause**: Build command running from wrong directory

**Solution**:

1. Ensure `requirements.txt` is in project root
2. Check Procfile working directory
3. Verify render.yaml paths

### Deployment Hangs or Times Out

**Cause**:

- Database not created yet
- Service waiting for slow dependency installation
- Long-running migrations

**Solution**:

1. Wait 5 minutes after database creation
2. Check logs for slow operations
3. Increase timeout in gunicorn:

```bash
# In Procfile or Render start command:
gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT --timeout 120 --workers 2
```

### Service Stuck in "Building" or "Deploying"

**Solution**:

1. Go to service dashboard
2. Click **"..."** menu → **"Cancel Deploy"**
3. Fix the issue (see logs)
4. Manually trigger new deploy by pushing to main branch
5. Or click **"Deploy"** button again

---

## Runtime Issues

### Service Won't Start: "Port Already in Use"

**Cause**: PORT variable conflict or multiple processes

**Solution**:

1. Clear environment variables in Render dashboard
2. Restart service: Click **"..."** → **"Restart Service"**
3. Check Procfile uses `$PORT` variable

### 500 Error - Internal Server Error

**Steps to investigate**:

1. Go to service **Logs** tab
2. Look for Python traceback
3. Check database connection:

```bash
# In Render Shell:
python manage.py dbshell
```

**Common causes and fixes**:

- Missing migration: `python manage.py migrate`
- Incorrect setting: Check `DEBUG=0`, `ALLOWED_HOSTS` set
- Database not connected: Verify `DATABASE_URL` env var exists
- Missing static files: `python manage.py collectstatic --noinput`

### 502 Bad Gateway

**Cause**: Service crashed or not responding

**Solution**:

1. Check logs for crash
2. Restart service
3. Verify gunicorn processes:

```bash
# In Shell:
ps aux | grep gunicorn
```

4. Increase workers if needed:

```bash
gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT --workers 4
```

### 404 Not Found on All Endpoints

**Cause**: ALLOWED_HOSTS blocking requests

**Solution**:

1. Get your service URL from dashboard (e.g., `smartexam-backend-abc.onrender.com`)
2. Update environment variable:
   - Key: `ALLOWED_HOSTS`
   - Value: Your URL from above
3. Redeploy service

---

## Database Issues

### "Connection Refused" or "Cannot Connect to Database"

**Cause**: Database not created or not linked

**Solution**:

1. In web service, check **Environment** tab
2. Look for `DATABASE_URL` - if missing, it's not linked
3. If using render.yaml:
   - Ensure `databases` section exists
   - Check database name matches
4. If manual setup:
   - Create PostgreSQL service first
   - Copy `DATABASE_URL` from database dashboard
   - Paste into web service environment

**Wait for database**:

- After creating database, wait 2-3 minutes before deploying service

### Migration Error: "Column Does Not Exist"

**Cause**: Database schema out of sync with code

**Solution**:

```bash
# In Render Shell:
python manage.py migrate --verbosity 2
```

If still fails:

```bash
# Reset database (WARNING: deletes all data!)
python manage.py migrate --reset
```

Or check specific migration:

```bash
python manage.py showmigrations
python manage.py migrate api 0001 --fake  # Fake apply if stuck
```

### "Too Many Connections" Error

**Cause**: Connection pool exhausted

**Solution**:

1. Increase `CONN_MAX_AGE` in settings.py:

```python
"CONN_MAX_AGE": 300  # seconds
```

2. Restart service
3. Monitor: Render dashboard → Database → Connections

---

## Static Files Issues

### 404 on Static Files (CSS/JS)

**Cause**: Static files not collected or WhiteNoise not configured

**Solution**:

1. Verify WhiteNoise in requirements.txt
2. Check build command includes `collectstatic`:

```bash
python manage.py collectstatic --noinput
```

3. Verify in Django settings:

```python
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
```

4. Check static files collected:
   ```bash
   ls -la staticfiles/
   ```

---

## CORS & Authentication Issues

### CORS Error: "No 'Access-Control-Allow-Origin' Header"

**Cause**: Frontend URL not in CORS_ALLOWED_ORIGINS

**Solution**:

1. Get your frontend URL (e.g., from Vercel/Netlify)
2. Add to environment variable `CORS_ALLOWED_ORIGINS`:
   ```
   https://frontend-domain.vercel.app,https://another-frontend.onrender.com
   ```
3. Redeploy service
4. Restart frontend

**Note**: Include full protocol (`https://`, not `http://`)

### 401 Unauthorized on Protected Endpoints

**Cause**: Missing or invalid JWT token

**Test authentication**:

```bash
# Get token
curl -X POST https://your-api.onrender.com/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'

# Returns: {"access": "token...", "refresh": "token..."}

# Use token
curl https://your-api.onrender.com/api/exams/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Token Expires Too Quickly

**Adjust token lifetime** in `backend/settings.py`:

```python
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=1),  # Change from minutes
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),  # Change from days
}
```

---

## Performance Issues

### Service Running Slowly

**Causes**:

1. Using free plan (limited resources)
2. Too many workers
3. N+1 query problem
4. Database on free plan

**Solutions**:

```bash
# Check active processes
ps aux | grep gunicorn

# Adjust workers (1-2 for free, 4-8 for paid)
gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT --workers 2

# Monitor logs
tail -f logs
```

### Service Keeps Spinning Down (Free Plan)

**This is normal** - Free tier sleeps after 15 minutes inactivity

**Solution**: Upgrade to Starter plan

---

## Environment Variable Issues

### Settings Not Updating After Changing Env Vars

**Solution**:

1. Change environment variable in Render dashboard
2. **Restart Service**: Click **"..."** → **"Restart Service"**
   (or redeploy from GitHub)
3. Verify change took effect:

```bash
# In Shell:
python -c "from django.conf import settings; print(settings.DEBUG)"
```

### Secret Key Exposed in Logs

**If SECRET_KEY appears in logs**:

1. **IMMEDIATELY** generate new key
2. Update `DJANGO_SECRET_KEY` in environment
3. Restart service
4. Clear logs if possible

**Prevent this**:

- Never log `SECRET_KEY` value
- Use `DEBUG=0` in production
- Check `LOGGING` configuration

---

## Render-Specific Issues

### "Permission Denied" on render.yaml

**Solution**:

- render.yaml must be in repository root
- Ensure read permissions
- Push to GitHub and retry deployment

### Service Keeps Rebuilding

**Cause**: Continuous deployment on every push

**To control deploys**:

1. Go to service **Settings**
2. Under "Deploy Hooks", can create manual trigger
3. Or disable auto-deploy and use manual redeploy button

### Can't Execute Shell Commands

**Solution**:

1. Ensure service is running
2. Try restarting service
3. Wait for service to fully start before opening Shell
4. Check if Shell is available for your plan (may be paid feature)

---

## Useful Debugging Commands

Run these in Render **Shell**:

```bash
# Check Python version
python --version

# Check Django version
python -c "import django; print(django.VERSION)"

# Check database connection
python manage.py dbshell

# List all installed apps
python manage.py shell
>>> from django.conf import settings
>>> print(settings.INSTALLED_APPS)

# Check active migrations
python manage.py showmigrations

# Test settings
python manage.py diffsettings

# Check environment variables
env | grep DJANGO
env | grep DATABASE

# View service logs
cat run_server.log

# Check disk usage
du -sh *
df -h
```

---

## Getting More Help

### Check Logs

1. Go to service dashboard
2. Click **"Logs"** tab
3. Search for error messages
4. Timestamp helps identify when issue occurred

### Contact Render Support

- Email: support@render.com
- Include:
  - Service name and ID
  - Build/deployment timestamp
  - Error message or description
  - What you were trying to do

### Check Status Page

- https://status.render.com
- See if Render services are having issues

### Django/DRF Community

- Stack Overflow: Tag `django`, `django-rest-framework`
- Django Forum: https://forum.djangoproject.com/
- Reddit: r/django

---

## Prevention Tips

✅ **Always use render.yaml** - Version control your infrastructure
✅ **Test locally first** - Use `.env.render` for production-like testing
✅ **Monitor logs regularly** - Catch issues early
✅ **Keep dependencies updated** - Run `pip freeze > requirements.txt` regularly
✅ **Set up monitoring** - Use Render's built-in metrics
✅ **Document your setup** - Save your environment variables reference
✅ **Backup database** - Enable auto-backups in PostgreSQL settings
✅ **Use separate secrets** - Never share keys, generate new for each environment

---

**Still stuck?** Check:

1. Error logs (most detailed source)
2. This guide (common solutions)
3. Render docs: https://render.com/docs
4. Django docs: https://docs.djangoproject.com/

Good luck! 🚀
