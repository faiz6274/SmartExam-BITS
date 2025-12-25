# SmartExam Backend - Render Deployment Guide

Welcome! This folder contains your fully-configured SmartExam Django backend, ready to deploy to Render.

## 🎯 What You'll Find Here

### 📖 Documentation (Read in This Order)

1. **[RENDER_SUMMARY.md](RENDER_SUMMARY.md)** ⭐ **START HERE**

   - Overview of changes made
   - 2-minute visual summary
   - Quick reference guide

2. **[RENDER_QUICK_START.md](RENDER_QUICK_START.md)** 🚀 **THEN READ THIS**

   - Step-by-step deployment instructions
   - Environment variables checklist
   - Testing verification
   - Takes 5-15 minutes

3. **[RENDER_CHECKLIST.md](RENDER_CHECKLIST.md)** ✅ **FOLLOW THIS**

   - Complete step-by-step checklist
   - Check off each item as you complete
   - Ensures nothing is missed

4. **[RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)** 📚 **FOR REFERENCE**

   - Comprehensive deployment guide
   - All configuration options explained
   - Production considerations
   - Scaling and performance tips

5. **[RENDER_TROUBLESHOOTING.md](RENDER_TROUBLESHOOTING.md)** 🔧 **IF ISSUES ARISE**
   - Common problems and solutions
   - Debugging commands
   - Getting help resources

### ⚙️ Configuration Files Ready

- **`render.yaml`** - Infrastructure as code (recommended)
- **`Procfile`** - Alternative deployment method
- **`.env.render`** - Environment variables template
- **`requirements.txt`** - Updated with production dependencies
- **`backend/settings.py`** - Configured for production
- **`Dockerfile`** - Updated for production

### 🛠️ Helper Scripts

- **`render_helper.py`** - Generates DJANGO_SECRET_KEY and environment templates

---

## ⚡ Quick Start (15 minutes)

### Step 1: Generate Secret Key

```bash
python render_helper.py
```

Save the `DJANGO_SECRET_KEY` output.

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Configure for Render deployment"
git push origin main
```

### Step 3: Deploy on Render

**Option A: Using render.yaml (Recommended)**

1. Go to https://render.com/dashboard
2. Click **"+ New"** → **"Infrastructure as Code"**
3. Select your GitHub repository
4. Deploy!

**Option B: Manual Setup**

1. Create Web Service
2. Create PostgreSQL Database
3. Add environment variables
4. Deploy

### Step 4: Run Migrations

In Render Shell:

```bash
python manage.py migrate
python manage.py createsuperuser
```

### Step 5: Test Your API

```bash
curl https://your-service-url/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
```

**Done!** Your backend is live! 🎉

---

## 📋 What's Been Changed

### New Files Created

| File               | Purpose                      |
| ------------------ | ---------------------------- |
| `render.yaml`      | Render infrastructure config |
| `Procfile`         | Build/start commands         |
| `.env.render`      | Environment template         |
| `render_helper.py` | Helper script                |
| `RENDER_*.md`      | Documentation                |

### Files Updated

| File                  | Changes                                           |
| --------------------- | ------------------------------------------------- |
| `requirements.txt`    | Added: whitenoise, dj-database-url                |
| `backend/settings.py` | Production config, security headers, DATABASE_URL |
| `Dockerfile`          | Static files collection, PORT config              |

### Files Unchanged

All your actual models, views, URLs, and API endpoints remain unchanged!

---

## 🔑 Key Features Configured

✅ **Django REST Framework** - Full API support
✅ **JWT Authentication** - Token-based login
✅ **PostgreSQL** - Production database
✅ **WhiteNoise** - Static file serving
✅ **AWS S3 Compatible** - Media storage (optional)
✅ **CORS Configured** - Frontend integration
✅ **Security Headers** - HTTPS/SSL/HSTS
✅ **Environment Variables** - Secure configuration
✅ **Auto-scaling** - Render handles load

---

## 🌐 Architecture

```
┌─────────────────┐
│  Your Computer  │
│    (develop)    │
└────────┬────────┘
         │
         ├─ git push → GitHub
         │
┌────────▼────────┐
│  GitHub Repo    │
│  (main branch)  │
└────────┬────────┘
         │
         ├─ webhook trigger
         │
┌────────▼────────────────────────┐
│  Render Platform                 │
├──────────────────────────────────┤
│                                  │
│  ┌──────────────────────────┐   │
│  │  Web Service (Django)    │   │
│  │  - Python 3.11          │   │
│  │  - Gunicorn             │   │
│  │  - Whitenoise           │   │
│  └──────────────────────────┘   │
│                                  │
│  ┌──────────────────────────┐   │
│  │  PostgreSQL Database     │   │
│  │  - Encrypted            │   │
│  │  - Auto-backups         │   │
│  │  - SSL Connection       │   │
│  └──────────────────────────┘   │
│                                  │
└────────┬────────────────────────┘
         │
         ├─ https://domain.onrender.com
         │
┌────────▼────────┐
│  Frontend       │
│  (React/Expo)   │
└─────────────────┘
```

---

## 📚 Documentation by Use Case

### I want to deploy quickly

→ Read: [RENDER_QUICK_START.md](RENDER_QUICK_START.md)

### I want step-by-step guidance

→ Use: [RENDER_CHECKLIST.md](RENDER_CHECKLIST.md)

### I need all the details

→ Read: [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)

### Something is broken

→ Check: [RENDER_TROUBLESHOOTING.md](RENDER_TROUBLESHOOTING.md)

### I want to understand changes

→ Read: [RENDER_SUMMARY.md](RENDER_SUMMARY.md)

---

## 🚀 Deployment Comparison

| Method      | Time          | Effort    | Control |
| ----------- | ------------- | --------- | ------- |
| render.yaml | ⚡⚡ 5 min    | 😀 Easy   | 100%    |
| Manual      | ⚡⚡⚡ 10 min | 😐 Medium | 100%    |
| Docker      | ⚡⚡⚡ 15 min | 😕 Hard   | 100%    |

**Recommended**: Use `render.yaml` for fastest, easiest deployment.

---

## 📦 Environment Variables

### Automatically Provided by Render

- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Service port (8000)

### You Must Provide

- `DJANGO_SECRET_KEY` - Generate with: `python render_helper.py`
- `ALLOWED_HOSTS` - Your Render domain (assigned automatically)

### Optional Configuration

- `CORS_ALLOWED_ORIGINS` - Your frontend URL
- `AWS_*` - If using S3 for media storage
- `DEBUG` - Already set to 0 for production

See [.env.render](.env.render) for complete list.

---

## 🧪 Testing Locally First

Before deploying, test production configuration locally:

```bash
# Create .env.test with production-like settings
cp .env.render .env.test

# Edit .env.test to use local database
# Set: DEBUG=0, USE_LOCAL_DB=0, DATABASE_URL=postgresql://...

# Load settings and test
export $(cat .env.test | xargs)
python manage.py test

# Run server in production mode
python manage.py runserver 0.0.0.0:8000
```

---

## 🔒 Security Considerations

### ✅ Already Configured

- HTTPS/SSL enforced
- HSTS headers enabled
- Secure cookies
- CSRF protection
- SQL injection prevention
- XSS protection

### ⚠️ You Must Do

- Change `DJANGO_SECRET_KEY` (use `render_helper.py`)
- Set appropriate `ALLOWED_HOSTS`
- Configure `CORS_ALLOWED_ORIGINS`
- Keep `DEBUG = 0` in production
- Use strong admin password

### 🔐 Best Practices

- Enable database backups
- Monitor error logs
- Keep dependencies updated
- Use environment variables for secrets
- Implement rate limiting (if needed)
- Set up monitoring/alerts

---

## 📊 Monitoring & Maintenance

### Check These Regularly

- Service status (should be "Live")
- Error logs (check for warnings)
- Resource usage (CPU, memory, database)
- API response times
- Database size

### Regular Maintenance

- **Daily**: Scan logs for errors
- **Weekly**: Verify API functionality
- **Monthly**: Review resource usage
- **Quarterly**: Update dependencies

### Useful Commands (in Render Shell)

```bash
python manage.py migrate              # Apply migrations
python manage.py createsuperuser      # Add admin user
python manage.py collectstatic        # Update static files
python manage.py shell                # Django shell
python manage.py dbshell              # Database shell
python manage.py test                 # Run tests
```

---

## 🆘 Getting Help

### If Deployment Fails

1. Check [RENDER_TROUBLESHOOTING.md](RENDER_TROUBLESHOOTING.md)
2. Review **Logs** tab in Render dashboard
3. Common fixes:
   - Missing dependency → add to requirements.txt
   - Database issue → verify DATABASE_URL
   - Settings issue → check environment variables

### If API Doesn't Work

1. Test: `curl https://your-url/api/token/`
2. Check logs in Render Shell
3. Verify database migrations ran
4. Check ALLOWED_HOSTS and CORS configuration

### Resources

- Render Docs: https://render.com/docs
- Django Docs: https://docs.djangoproject.com/
- DRF Docs: https://www.django-rest-framework.org/
- GitHub Status: https://www.githubstatus.com/

---

## 🎓 Next Steps After Deployment

1. ✅ Deploy your frontend
2. ✅ Test end-to-end integration
3. ✅ Set up monitoring
4. ✅ Configure custom domain (optional)
5. ✅ Upgrade to paid plan for production
6. ✅ Implement CI/CD pipeline

---

## 📝 Checklist Before Going Live

- [ ] Deployment successful (service shows "Live")
- [ ] Database migrations completed
- [ ] Admin user created
- [ ] API responds to requests
- [ ] Frontend can connect to API
- [ ] HTTPS enforced (no HTTP)
- [ ] DEBUG = 0
- [ ] All environment variables set
- [ ] Secret key is strong
- [ ] CORS configured for frontend
- [ ] Error logs checked
- [ ] Backups enabled

---

## 💡 Pro Tips

- **Save URLs**: Note your service URL and database credentials
- **Use render.yaml**: Makes re-deploying easier
- **Monitor logs**: Catch issues early
- **Backup database**: Enable auto-backups
- **Test before pushing**: Prevents deployment failures
- **Use separate secrets**: Different keys for each environment
- **Document changes**: Keep notes on what you configured

---

## 🎉 Success!

Your SmartExam Django backend is ready for Render deployment!

**Next Action**:

1. Read [RENDER_SUMMARY.md](RENDER_SUMMARY.md) (2 min)
2. Read [RENDER_QUICK_START.md](RENDER_QUICK_START.md) (5-15 min)
3. Follow [RENDER_CHECKLIST.md](RENDER_CHECKLIST.md) (15-20 min)
4. Your app is live! 🚀

---

## 📞 Support

- 📖 Read documentation first
- 🔍 Check logs for errors
- 🆘 Review troubleshooting guide
- 📧 Contact: support@render.com

---

**Questions?** Start with the documentation linked above.

**Ready to deploy?** Go to [RENDER_QUICK_START.md](RENDER_QUICK_START.md) now!

**Good luck!** 🚀✨
