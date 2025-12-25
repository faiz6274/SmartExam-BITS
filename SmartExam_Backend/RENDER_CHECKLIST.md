# Render Deployment - Step-by-Step Checklist

Use this checklist to track your deployment progress. Check off each item as you complete it.

## Phase 1: Preparation (5 minutes)

### Prerequisites

- [ ] Have GitHub account with code pushed
- [ ] GitHub repository accessible from https://github.com
- [ ] All code committed: `git log` shows recent commits
- [ ] No uncommitted changes: `git status` is clean

### Local Verification

- [ ] `manage.py` exists in project root
- [ ] `backend/settings.py` exists
- [ ] `requirements.txt` contains all dependencies
- [ ] Python 3.9+ installed locally: `python --version`
- [ ] Can run Django commands: `python manage.py --help`

### Create Render Account

- [ ] Visit https://render.com
- [ ] Sign up (free account available)
- [ ] Verify email
- [ ] Create organization (optional)

---

## Phase 2: Configuration (5 minutes)

### Generate Secrets

- [ ] Run: `python render_helper.py`
- [ ] Copy the `DJANGO_SECRET_KEY` value
- [ ] Save it somewhere safe (not in code!)

### Final Commit

- [ ] Review changes: `git diff`
- [ ] Stage files: `git add .`
- [ ] Commit: `git commit -m "Configure for Render deployment"`
- [ ] Push: `git push origin main` (or your branch)
- [ ] Verify on GitHub website

---

## Phase 3: Render Service Setup (10 minutes)

### Create Web Service

- [ ] Go to https://render.com/dashboard
- [ ] Click **"+ New"** → **"Web Service"**
- [ ] Or click **"+ New"** → **"Infrastructure as Code"** (recommended)

#### If using render.yaml (Recommended)

- [ ] Select your GitHub repository
- [ ] Branch: `main` (or your default)
- [ ] Click **"Deploy"**
- [ ] Wait for build to complete

#### If manual setup:

- [ ] Select your GitHub repository
- [ ] **Service Name**: `smartexam-backend`
- [ ] **Branch**: `main`
- [ ] **Runtime**: Python 3
- [ ] **Build Command**:
  ```
  pip install --upgrade pip && pip install -r requirements.txt && python manage.py collectstatic --noinput
  ```
- [ ] **Start Command**:
  ```
  gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT --workers 2
  ```
- [ ] **Plan**: Free (for now)
- [ ] Click **"Create Web Service"**

### Create PostgreSQL Database

- [ ] Click **"+ New"** → **"PostgreSQL"**
- [ ] **Name**: `smartexam-db`
- [ ] **Database**: `smartexam`
- [ ] **User**: `postgres`
- [ ] **Plan**: Free
- [ ] Click **"Create Database"**
- [ ] Wait for database to be created (2-3 minutes)
- [ ] Note the `DATABASE_URL` (will need this)

### Link Database to Web Service

- [ ] Go back to web service
- [ ] Go to **"Environment"** tab
- [ ] Should show `DATABASE_URL` auto-linked
- [ ] If not, manually add from database dashboard

---

## Phase 4: Environment Variables (5 minutes)

### Add Required Variables

In your web service **Environment** tab, add these:

| Key                     | Value              | Source                       |
| ----------------------- | ------------------ | ---------------------------- |
| `DEBUG`                 | `0`                | Static value                 |
| `DJANGO_SECRET_KEY`     | Your generated key | From render_helper.py        |
| `ALLOWED_HOSTS`         | (see below)        | Will update after deployment |
| `USE_LOCAL_DB`          | `0`                | Static value                 |
| `POSTGRES_SSLMODE`      | `require`          | Static value                 |
| `SECURE_SSL_REDIRECT`   | `1`                | Static value                 |
| `SESSION_COOKIE_SECURE` | `1`                | Static value                 |
| `CSRF_COOKIE_SECURE`    | `1`                | Static value                 |
| `SECURE_HSTS_SECONDS`   | `31536000`         | Static value                 |

### Add Optional Variables (If Needed)

- [ ] `CORS_ALLOWED_ORIGINS` - Your frontend URL (after deployment)
- [ ] `AWS_ACCESS_KEY_ID` - Only if using S3
- [ ] `AWS_SECRET_ACCESS_KEY` - Only if using S3
- [ ] `AWS_STORAGE_BUCKET_NAME` - Only if using S3
- [ ] `AWS_S3_REGION_NAME` - Only if using S3

### Verify Variables

- [ ] Each variable appears in **Environment** tab
- [ ] No typos in variable names
- [ ] Values are correct (especially SECRET_KEY)

---

## Phase 5: Initial Deployment (10 minutes)

### Start Deployment

- [ ] If using render.yaml: Click **"Deploy"**
- [ ] If manual: Click **"Create Web Service"**
- [ ] Go to **"Logs"** tab
- [ ] Watch build process
- [ ] Green checkmarks ✅ appear as builds succeed

### Build Stages (in order)

1. [ ] "Starting build process"
2. [ ] "Installing dependencies" (takes 1-2 min)
3. [ ] "Collecting static files"
4. [ ] "Build successful"
5. [ ] "Deploying container"
6. [ ] Service status shows "Live" (green)

### Verify Live Service

- [ ] Service status is "Live" (not "Building")
- [ ] Service URL assigned (e.g., `smartexam-backend-xxx.onrender.com`)
- [ ] Copy this URL for later

### If Build Fails

- [ ] Check **Logs** tab for error
- [ ] Common issues: missing dependency, wrong path
- [ ] Fix error locally
- [ ] Commit and push to GitHub
- [ ] Render auto-redeploys, or click **"Deploy"** again

---

## Phase 6: Database Setup (5 minutes)

### Access Render Shell

- [ ] Go to web service dashboard
- [ ] Click **"Shell"** (top right)
- [ ] Wait for shell to load (shows prompt)

### Run Migrations

```bash
python manage.py migrate
```

- [ ] Command completes without error
- [ ] See "Operations to perform" and "Applying"
- [ ] All migrations applied (should see check marks)

### Create Admin User

```bash
python manage.py createsuperuser
```

- [ ] Prompted for username (type and press Enter)
- [ ] Prompted for email (type and press Enter)
- [ ] Prompted for password (type, no echo)
- [ ] Prompted for password confirmation
- [ ] Shows "Superuser created successfully"

### Exit Shell

- [ ] Type `exit` or close shell window

---

## Phase 7: Update ALLOWED_HOSTS (2 minutes)

### Get Your Service URL

- [ ] Go to web service dashboard
- [ ] At the top, copy the service URL (e.g., `smartexam-backend-abc123.onrender.com`)

### Update Environment

- [ ] Go to **Environment** tab
- [ ] Find `ALLOWED_HOSTS` variable
- [ ] Change from `*` to your service URL
- [ ] Click **"Save"**
- [ ] Service will redeploy automatically
- [ ] Check **Logs** until status is "Live" again

---

## Phase 8: Test Your API (5 minutes)

### Test 1: Access Root API

```bash
curl https://your-service-url/api/
```

- [ ] Returns JSON response (no 500/404 error)
- [ ] Status code 200

### Test 2: Login and Get Token

```bash
curl -X POST https://your-service-url/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
```

- [ ] Returns JSON with `access` and `refresh` tokens
- [ ] Status code 200
- [ ] Copy the `access` token value

### Test 3: Access Protected Endpoint

```bash
curl https://your-service-url/api/exams/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

- [ ] Returns JSON response
- [ ] Status code 200
- [ ] May be empty list if no exams yet (that's OK)

### Test 4: Admin Panel

- [ ] Go to `https://your-service-url/admin/`
- [ ] Login with admin username and password
- [ ] See Django admin dashboard
- [ ] Navigate to see models (Exams, Users, etc.)

---

## Phase 9: Frontend Integration (As Needed)

### Configure Frontend

- [ ] Update frontend API base URL to your Render service
- [ ] Example: `https://your-service-url/api/`
- [ ] Ensure frontend uses HTTPS (not HTTP)

### Add CORS Configuration

- [ ] Go to web service **Environment**
- [ ] Find `CORS_ALLOWED_ORIGINS`
- [ ] Add your frontend URL: `https://your-frontend-url`
- [ ] If multiple frontends, separate with commas
- [ ] Click **"Save"**
- [ ] Wait for redeploy

### Test Frontend Connection

- [ ] Deploy frontend to Render/Vercel/Netlify
- [ ] Login from frontend
- [ ] Verify API calls work
- [ ] Check backend logs for any errors

---

## Phase 10: Production Verification (5 minutes)

### Security Check ✅

- [ ] DEBUG is 0: `curl https://your-url/api/wrongpath/` (should not show debug info)
- [ ] HTTPS enforced: Visiting `http://` should redirect to `https://`
- [ ] SECRET_KEY is strong (not visible anywhere)

### Database Check ✅

- [ ] Can query data: Logged-in API calls return data
- [ ] No connection errors in logs
- [ ] Can create new records via API

### Performance Check ✅

- [ ] API responds within 1-2 seconds
- [ ] No timeout errors
- [ ] Logs show healthy status

### Functionality Check ✅

- [ ] Authentication works (login, token, refresh)
- [ ] Authorization works (protected endpoints require token)
- [ ] CRUD operations work (create, read, update, delete)
- [ ] Static files load (if any)

---

## Phase 11: Monitoring Setup (Optional)

### Enable Monitoring

- [ ] Go to service **Settings**
- [ ] Check "Use analytics" or similar option
- [ ] Go to service **Metrics** tab
- [ ] Review CPU, Memory, Requests graphs

### Set Up Alerts (Optional)

- [ ] Go to service **Settings**
- [ ] Set up email alerts for:
  - [ ] High memory usage
  - [ ] Service crashes
  - [ ] Build failures

### Log Management

- [ ] Regularly check **Logs** tab
- [ ] Look for errors or warnings
- [ ] Note any issues

---

## Phase 12: Backup & Maintenance

### Database Backup

- [ ] Go to PostgreSQL service
- [ ] Go to **Settings**
- [ ] Enable **Auto-Backup**: Yes
- [ ] Set backup frequency (Daily recommended)
- [ ] Note backup retention period

### Scaling (If Needed)

- [ ] Monitor service usage
- [ ] If consistently high: Upgrade plan
- [ ] Consider paid plan after free tier testing

### Dependency Updates

- [ ] Periodically: `pip install --upgrade pip`
- [ ] Update packages: `pip install -r requirements.txt --upgrade`
- [ ] Run tests: `python manage.py test`
- [ ] Deploy new version

---

## Troubleshooting: If Something Fails

### Build Failed?

- [ ] Check **Logs** tab for error message
- [ ] Fix error locally
- [ ] Commit and push
- [ ] Render auto-redeploys

### Can't Connect to Database?

- [ ] Verify `DATABASE_URL` env var exists
- [ ] Check PostgreSQL service is running
- [ ] Wait 2-3 minutes after DB creation
- [ ] Restart web service

### 404 on Endpoints?

- [ ] Verify `ALLOWED_HOSTS` includes your URL
- [ ] Check endpoint path is correct
- [ ] Review API URL configuration

### CORS Error?

- [ ] Add frontend URL to `CORS_ALLOWED_ORIGINS`
- [ ] Include full protocol: `https://`
- [ ] Redeploy service

### Migrations Failed?

- [ ] Go to Shell
- [ ] Run: `python manage.py migrate --verbosity 2`
- [ ] See error message
- [ ] Fix issue locally
- [ ] Redeploy

---

## Final Verification Checklist ✅

### Ready for Production?

- [ ] Service is Live (not building)
- [ ] Database is connected
- [ ] Migrations applied
- [ ] Admin user created
- [ ] API responds
- [ ] Frontend can connect
- [ ] HTTPS enforced
- [ ] DEBUG = 0
- [ ] All env vars correct
- [ ] Tests pass

### Before Going Live:

- [ ] Backup database enabled
- [ ] Logs being monitored
- [ ] Error handling configured
- [ ] Frontend deployment ready
- [ ] DNS/domain configured (if using custom domain)

---

## Success! 🎉

When you reach this point, check off:

- [ ] All phases completed
- [ ] All tests passing
- [ ] API fully functional
- [ ] Frontend integrated
- [ ] Deployment verified
- [ ] Production ready

**Your SmartExam backend is now live on Render!** 🚀

---

## Next Steps After Deployment

1. **Monitor**: Check logs regularly
2. **Scale**: Upgrade plan if needed
3. **Backup**: Enable auto-backups
4. **Maintain**: Keep dependencies updated
5. **Improve**: Add features and improvements

---

**Stuck?**

- Check: RENDER_QUICK_START.md
- Troubleshoot: RENDER_TROUBLESHOOTING.md
- Reference: RENDER_DEPLOYMENT.md

**Congrats on your successful deployment!** 🎓
