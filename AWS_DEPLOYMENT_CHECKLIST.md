# AWS Deployment Checklist & Commands

## 📋 Pre-Deployment Checklist

### ✅ Prerequisites

- [ ] AWS Account created (https://aws.amazon.com)
- [ ] AWS credentials configured
- [ ] Node.js v24+ installed
- [ ] npm v11+ installed
- [ ] EAS CLI installed: `npm install -g eas-cli`
- [ ] Expo account created (https://expo.dev)
- [ ] PostgreSQL client installed (optional, for testing)

### ✅ Review Documentation

- [ ] Read QUICK_AWS_SETUP.md
- [ ] Read AWS_CONFIG_REFERENCE.md
- [ ] Review AWS_DEPLOYMENT_GUIDE.md (if needed)

### ✅ Code Ready

- [ ] SmartExam_Frontend/src/api/axios.js updated ✅
- [ ] SmartExam_Backend/.env configured ✅
- [ ] All dependencies in package.json ✅
- [ ] All dependencies in requirements.txt ✅

---

## 🚀 Phase 1: RDS Database (Already Done ✅)

### ✅ Complete (Skip These)

- [x] Create RDS PostgreSQL instance
- [x] Configure database name: `smartexam-mrp`
- [x] Set credentials: postgresmart / WinterStart03
- [x] Set up security groups
- [x] Database is ready

### 🧪 Verify RDS Works

```powershell
# Test from command line (if psql installed)
psql -h smartexam-db.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com `
     -U postgresmart `
     -d smartexam-mrp `
     -p 5432

# Password: WinterStart03
# Expected: smartexam-mrp=>
```

---

## 🚀 Phase 2: EC2 Backend Setup (Next - ~30 minutes)

### Step 2.1: Create EC2 Instance

```
AWS Console → EC2 → Launch Instances

✓ AMI: Ubuntu Server 22.04 LTS (64-bit x86)
✓ Instance Type: t2.micro
✓ Key Pair: Create new → smartexam-key.pem (DOWNLOAD!)
✓ Security Group: Create new
  - SSH (port 22): Your IP only
  - HTTP (port 80): 0.0.0.0/0
  - HTTPS (port 443): 0.0.0.0/0
  - Custom (port 8000): 0.0.0.0/0

Click: Launch Instance
Wait: Instance shows "Running"
Copy: Public IPv4 address (e.g., 54.123.45.67)
```

### Step 2.2: Connect to EC2

```powershell
# PowerShell (as Administrator)
$keyPath = "C:\path\to\smartexam-key.pem"
$instanceIP = "54.123.45.67"  # Replace with your IP

# Set key permissions
icacls $keyPath /inheritance:r
icacls $keyPath /grant:r "$env:USERNAME`:`(F`)"

# SSH into instance
ssh -i $keyPath ubuntu@$instanceIP
```

Or use PuTTY / MobaXterm for GUI.

### Step 2.3: Install Dependencies (On EC2)

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y python3 python3-pip python3-venv
sudo apt install -y postgresql-client
sudo apt install -y nginx supervisor git
```

### Step 2.4: Deploy Code (On EC2)

```bash
cd /home/ubuntu
git clone https://github.com/faiz6274/SmartExam-BITS.git
cd SmartExam-BITS/SmartExam_Backend

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Step 2.5: Create .env File (On EC2)

```bash
nano .env
```

Paste and update:

```env
DEBUG=False
DJANGO_SECRET_KEY=your-random-secret-key-here-12345
ALLOWED_HOSTS=54.123.45.67,your-domain.com
USE_LOCAL_DB=false

POSTGRES_DB=smartexam-mrp
POSTGRES_USER=postgresmart
POSTGRES_PASSWORD=WinterStart03
POSTGRES_HOST=smartexam-db.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com
POSTGRES_PORT=5432

AWS_ACCESS_KEY_ID=AKIAZH3XI77DS6WSTSL5
AWS_SECRET_ACCESS_KEY=OvX23VG/pI78jO6/Nnmdef56ScGh0tcULFUTxp3d
AWS_STORAGE_BUCKET_NAME=smart-exam-mrp
AWS_S3_REGION_NAME=ap-south-1
```

Replace:

- `54.123.45.67` → Your EC2 public IP
- `your-random-secret-key` → Something random (e.g., sha256 hash)
- `smartexam-db.XXXXX...` → Your actual RDS endpoint

### Step 2.6: Run Migrations (On EC2)

```bash
source venv/bin/activate
python manage.py migrate

# Create superuser
python manage.py createsuperuser
# username: admin
# email: admin@example.com
# password: Admin123!
```

### Step 2.7: Setup Gunicorn (On EC2)

```bash
cat > gunicorn_config.py << 'EOF'
import multiprocessing
bind = "127.0.0.1:8000"
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "sync"
max_requests = 1000
timeout = 60
EOF
```

### Step 2.8: Setup Supervisor (On EC2)

```bash
sudo nano /etc/supervisor/conf.d/smartexam.conf
```

Paste:

```ini
[program:smartexam]
directory=/home/ubuntu/SmartExam-BITS/SmartExam_Backend
command=/home/ubuntu/SmartExam-BITS/SmartExam_Backend/venv/bin/gunicorn -c gunicorn_config.py backend.wsgi:application
user=ubuntu
autostart=true
autorestart=true
stderr_logfile=/var/log/smartexam.err.log
stdout_logfile=/var/log/smartexam.out.log
environment=PATH="/home/ubuntu/SmartExam-BITS/SmartExam_Backend/venv/bin"
```

Start it:

```bash
sudo systemctl restart supervisor
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start smartexam
sudo supervisorctl status smartexam
```

### Step 2.9: Setup Nginx (On EC2)

```bash
sudo nano /etc/nginx/sites-available/smartexam
```

Paste (replace `54.123.45.67` with YOUR EC2 IP):

```nginx
upstream smartexam_app {
    server 127.0.0.1:8000;
}

server {
    listen 80;
    server_name 54.123.45.67;
    client_max_body_size 100M;

    location / {
        proxy_pass http://smartexam_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable it:

```bash
sudo ln -s /etc/nginx/sites-available/smartexam /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default 2>/dev/null
sudo nginx -t
sudo systemctl restart nginx
```

### 🧪 Verify Backend Works

```powershell
# From your computer (not SSH)
curl -X GET "http://54.123.45.67/api/login/"

# Should return:
# {"detail":"Method \"GET\" not allowed."}
```

✅ **Phase 2 Complete!** Backend is running.

---

## 🚀 Phase 3: APK Configuration (5 minutes)

### Step 3.1: Update Frontend API URL

Edit file: `SmartExam_Frontend/src/api/axios.js`

Find this section:

```javascript
const USE_LOCAL_BACKEND = true;
const AWS_BACKEND_URL = "https://your-backend-domain.com/api/";
```

Change to:

```javascript
const USE_LOCAL_BACKEND = false; // ← Change to false
const AWS_BACKEND_URL = "http://54.123.45.67/api/"; // ← Your EC2 IP
```

### Step 3.2: Update app.json (Optional but Recommended)

Edit: `SmartExam_Frontend/app.json`

Update version:

```json
{
  "expo": {
    "version": "1.0.1",
    ...
  }
}
```

### Step 3.3: Build APK

```powershell
cd c:\Users\muham\Downloads\SmartExam-BITS\SmartExam_Frontend

# Login to Expo
eas login

# Build for Android (production)
eas build --platform android

# Wait for build to complete (shows URL)
```

### Step 3.4: Download APK

Option A: Go to https://expo.dev/builds and download
Option B: Check terminal for download link

Save APK file to: `C:\Users\muham\Downloads\SmartExam.apk`

---

## 🚀 Phase 4: Testing & Verification (10 minutes)

### Step 4.1: Install APK on Phone

```powershell
# Connect phone via USB
# Enable USB Debugging on phone first

adb install C:\Users\muham\Downloads\SmartExam.apk
```

Or email APK and install manually.

### Step 4.2: Test Login

1. Open SmartExam app on phone
2. Tap "Create an account" → Test registration
3. Or use test account:
   ```
   Username: irfan
   Password: Irfan123!
   ```
4. Should see home screen ✅

### Step 4.3: Test Scanner

1. Tap "Scan & Submit"
2. Take a photo
3. Compress image
4. Submit exam

Should upload to AWS backend + RDS database ✅

### Step 4.4: Test Instructor Features

1. Login as instructor:
   ```
   Username: instructor1
   Password: Instructor123!
   ```
2. See student submissions
3. Add comments
4. Should work ✅

---

## ✅ Verification Checklist

- [ ] RDS PostgreSQL accessible
- [ ] EC2 instance running
- [ ] Supervisor shows smartexam "RUNNING"
- [ ] Nginx running without errors
- [ ] Backend responds: `curl http://your-ip/api/login/`
- [ ] APK installed on phone
- [ ] Can login with irfan/Irfan123!
- [ ] Can scan and submit document
- [ ] Can view submissions
- [ ] Instructor can see student submissions
- [ ] Comments system works

---

## 🔧 Quick Commands Reference

### EC2 Management

```bash
# SSH into instance
ssh -i smartexam-key.pem ubuntu@54.123.45.67

# Check services
sudo supervisorctl status smartexam
sudo systemctl status nginx
sudo systemctl status supervisor

# View logs
tail -f /var/log/smartexam.err.log
tail -f /var/log/smartexam.out.log

# Restart services
sudo supervisorctl restart smartexam
sudo systemctl restart nginx

# Update code
cd /home/ubuntu/SmartExam-BITS/SmartExam_Backend
git pull origin main
sudo supervisorctl restart smartexam
```

### Database Management

```bash
# Connect to RDS
psql -h smartexam-db.XXXXX.ap-south-1.rds.amazonaws.com \
     -U postgresmart -d smartexam-mrp

# Useful queries
\dt                    # List tables
SELECT * FROM users;   # View users
\q                     # Quit
```

### APK Building

```powershell
# Check build status
eas build --status

# View build logs
eas build:view

# Cancel build
eas build --cancel <BUILD_ID>
```

---

## 🚨 Common Issues & Fixes

### Issue: "502 Bad Gateway"

```bash
ssh -i key.pem ubuntu@ip
sudo supervisorctl status smartexam
# If not running:
sudo supervisorctl restart smartexam
```

### Issue: "Cannot connect to database"

```bash
# Check RDS endpoint in .env
cat .env | grep POSTGRES

# Test connection
psql -h <endpoint> -U postgresmart -d smartexam-mrp
```

### Issue: "APK shows blank screen"

```
1. Check axios.js has USE_LOCAL_BACKEND = false
2. Check AWS_BACKEND_URL has correct EC2 IP
3. Rebuild: eas build --platform android
```

### Issue: "Can't SSH into EC2"

```
1. Check .pem file permissions
2. Check security group allows SSH from your IP
3. Verify public IP address
```

---

## 💾 File Locations Reference

| File            | Purpose                    | Location                                |
| --------------- | -------------------------- | --------------------------------------- |
| API Config      | Frontend backend URL       | `SmartExam_Frontend/src/api/axios.js`   |
| Backend Config  | Database & server settings | `SmartExam_Backend/.env`                |
| Django Settings | Django configuration       | `SmartExam_Backend/backend/settings.py` |
| App Config      | App version & package      | `SmartExam_Frontend/app.json`           |

---

## 🎯 Summary

```
Phase 1: RDS Database       ✅ Already done
Phase 2: EC2 Backend        ⏳ ~30 minutes
Phase 3: APK Config         ⏳ ~5 minutes
Phase 4: Testing            ⏳ ~10 minutes

Total Time: ~55 minutes
Total Cost: $0 (free tier)
```

---

## 🚀 Ready to Go?

1. Create EC2 instance
2. Follow Phase 2 commands above
3. Update frontend API URL
4. Build APK
5. Install and test
6. Done! 🎉

**Questions? Check AWS_DEPLOYMENT_GUIDE.md for detailed info**
