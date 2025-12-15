# AWS Deployment Quick Setup - Step by Step

## 🎯 Overview

This guide will help you deploy:

1. **Database (RDS PostgreSQL)** - AWS Managed Database
2. **Backend (EC2)** - Django API Server
3. **APK** - Connected to AWS Backend

---

## Phase 1: AWS RDS Database Setup (15 minutes)

### Step 1.1: Create RDS Instance

1. Go to https://console.aws.amazon.com/rds/
2. Click **"Create database"**
3. Select **PostgreSQL** engine
4. Fill in:
   ```
   Instance Identifier: smartexam-db
   Master Username: postgresmart
   Password: WinterStart03
   Database Name: smartexam-mrp
   Instance Class: db.t3.micro (Free Tier)
   Storage: 20 GB
   Publicly Accessible: YES
   ```
5. Click **"Create database"** → Wait 5-10 minutes

### Step 1.2: Get RDS Endpoint

1. Go to RDS Dashboard
2. Click on your instance
3. Copy the **Endpoint** (e.g., `smartexam-db.c2fvwxyz.ap-south-1.rds.amazonaws.com`)
4. Note the **Port**: 5432

### Step 1.3: Configure Security Group

1. In RDS instance details, click Security Group
2. Edit **Inbound Rules**
3. Add rule:
   ```
   Type: PostgreSQL
   Port: 5432
   Source: 0.0.0.0/0 (allow all - secure this later!)
   ```
4. Save

### Step 1.4: Test Connection

```powershell
# Install PostgreSQL client if needed
# Then test:

psql -h smartexam-db.XXXXX.ap-south-1.rds.amazonaws.com `
     -U postgresmart `
     -d smartexam-mrp `
     -p 5432

# Type password: WinterStart03
```

✅ **RDS Ready!**

---

## Phase 2: AWS EC2 Backend Setup (30 minutes)

### Step 2.1: Launch EC2 Instance

1. Go to https://console.aws.amazon.com/ec2/
2. Click **"Launch Instances"**
3. Select **Ubuntu 22.04 LTS** (Free Tier)
4. Instance Type: **t2.micro** (Free Tier)
5. Create Security Group:
   ```
   SSH: Port 22 (your IP)
   HTTP: Port 80 (0.0.0.0/0)
   HTTPS: Port 443 (0.0.0.0/0)
   ```
6. Create key pair: `smartexam-key.pem` (Download!)
7. Click **"Launch Instance"**

### Step 2.2: Connect to EC2

```powershell
# Get instance public IP from AWS console
$IP = "ec2-XX-XXX-XXX-XXX.compute-1.amazonaws.com"

# Connect via SSH
ssh -i smartexam-key.pem ubuntu@$IP
```

### Step 2.3: Install Dependencies

```bash
# Copy-paste these commands one by one:

sudo apt update
sudo apt upgrade -y
sudo apt install -y python3 python3-pip python3-venv
sudo apt install -y postgresql-client
sudo apt install -y nginx
sudo apt install -y supervisor
sudo apt install -y git
```

### Step 2.4: Deploy Backend Code

```bash
# Navigate to home
cd /home/ubuntu

# Clone repository
git clone https://github.com/faiz6274/SmartExam-BITS.git
cd SmartExam-BITS/SmartExam_Backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python packages
pip install -r requirements.txt
```

### Step 2.5: Create .env File

```bash
nano .env
```

Paste this and update:

```env
DEBUG=False
DJANGO_SECRET_KEY=your-secret-key-change-me-12345
ALLOWED_HOSTS=your-ec2-public-ip,your-domain.com
USE_LOCAL_DB=false

# AWS RDS
POSTGRES_DB=smartexam-mrp
POSTGRES_USER=postgresmart
POSTGRES_PASSWORD=WinterStart03
POSTGRES_HOST=smartexam-db.XXXXX.ap-south-1.rds.amazonaws.com
POSTGRES_PORT=5432

# AWS S3
AWS_ACCESS_KEY_ID=AKIAZH3XI77DS6WSTSL5
AWS_SECRET_ACCESS_KEY=OvX23VG/pI78jO6/Nnmdef56ScGh0tcULFUTxp3d
AWS_STORAGE_BUCKET_NAME=smart-exam-mrp
AWS_S3_REGION_NAME=ap-south-1
```

**Replace:**

- `your-secret-key-change-me-12345` with something random
- `smartexam-db.XXXXX.ap-south-1.rds.amazonaws.com` with your RDS endpoint
- `your-ec2-public-ip` with your EC2 instance IP

### Step 2.6: Run Migrations

```bash
source venv/bin/activate
python manage.py migrate

# Create superuser
python manage.py createsuperuser
# Follow the prompts
```

### Step 2.7: Setup Gunicorn

```bash
# Create config file
cat > gunicorn_config.py << EOF
import multiprocessing

bind = "127.0.0.1:8000"
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "sync"
max_requests = 1000
timeout = 60
EOF
```

### Step 2.8: Setup Supervisor

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

### Step 2.9: Setup Nginx

```bash
sudo nano /etc/nginx/sites-available/smartexam
```

Paste (replace `your-ec2-ip` with your EC2 IP):

```nginx
upstream smartexam_app {
    server 127.0.0.1:8000;
}

server {
    listen 80;
    server_name your-ec2-ip;
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

Enable Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/smartexam /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

✅ **Backend Ready!**

---

## Phase 3: APK Configuration & Build (10 minutes)

### Step 3.1: Update Frontend API URL

Edit `SmartExam_Frontend/src/api/axios.js`:

Change this line:

```javascript
const USE_LOCAL_BACKEND = true; // Change to false for production
const AWS_BACKEND_URL = "https://your-backend-domain.com/api/"; // Change to your AWS domain!
```

To:

```javascript
const USE_LOCAL_BACKEND = false; // Use AWS backend
const AWS_BACKEND_URL = "http://your-ec2-public-ip/api/"; // Your EC2 IP
```

Example:

```javascript
const AWS_BACKEND_URL = "http://54.123.45.67/api/"; // Replace with your EC2 IP
```

### Step 3.2: Build APK

```powershell
cd c:\Users\muham\Downloads\SmartExam-BITS\SmartExam_Frontend

# Login to Expo (if not already)
eas login

# Build for Android
eas build --platform android

# Wait for build to complete (5-15 minutes)
# Download APK from https://expo.dev/builds
```

### Step 3.3: Install & Test APK

```powershell
# Connect phone via USB
adb install SmartExam.apk

# Or email APK to yourself and install on phone
```

### Step 3.4: Test Login

1. Open SmartExam app
2. Use test credentials:
   ```
   Username: irfan
   Password: Irfan123!
   ```
3. App should connect to AWS backend ✅

---

## Phase 4: Verify Everything

### Checklist

- [ ] RDS instance is "Available"
- [ ] Can connect to RDS with psql
- [ ] EC2 instance is "Running"
- [ ] Can SSH into EC2
- [ ] Supervisor shows smartexam as "RUNNING"
- [ ] Nginx is running (status shows active)
- [ ] Can access backend: `http://your-ec2-ip/api/login/`
- [ ] APK installed on phone
- [ ] Can login with AWS backend
- [ ] Can scan and submit documents

---

## Common Issues & Fixes

### Issue: Can't connect to RDS from EC2

```bash
# From EC2, test:
psql -h smartexam-db.XXXXX.ap-south-1.rds.amazonaws.com \
     -U postgresmart -d smartexam-mrp

# If fails, check RDS security group allows EC2 security group
```

### Issue: Nginx shows "502 Bad Gateway"

```bash
# Check Gunicorn
sudo supervisorctl status smartexam

# Restart if needed
sudo supervisorctl restart smartexam

# Check logs
tail -f /var/log/smartexam.err.log
```

### Issue: APK can't connect to backend

```
Check:
1. USE_LOCAL_BACKEND = false in axios.js
2. AWS_BACKEND_URL has correct EC2 IP
3. EC2 security group allows port 80
4. Nginx is running on EC2
```

### Issue: Migrations fail on EC2

```bash
# Check .env file
cat .env

# Make sure POSTGRES_HOST is correct RDS endpoint
# Test connection first

source venv/bin/activate
python manage.py migrate --verbosity 2
```

---

## Final Costs

| Service        | Free Tier | After 12 months |
| -------------- | --------- | --------------- |
| EC2 (t2.micro) | Free      | ~$10/month      |
| RDS (t3.micro) | Free      | ~$15/month      |
| **Total**      | **~$0**   | **~$25/month**  |

---

## Security Notes (Before Production)

1. **Change RDS password** from `WinterStart03`
2. **Generate new Django SECRET_KEY**
3. **Set DEBUG=False** in settings.py
4. **Restrict SSH to your IP** in security group
5. **Use SSL/HTTPS** (install free certificate with Let's Encrypt)
6. **Enable RDS backups** (7-30 days)
7. **Rotate AWS access keys** regularly

---

## 🎉 You're Done!

Your SmartExam app is now:

- ✅ Deployed on AWS EC2
- ✅ Using AWS RDS PostgreSQL
- ✅ APK connecting to AWS backend
- ✅ Ready to share with users!

**Next step:** Upload APK to Google Play Store for distribution.

---

**Need help? Check AWS_DEPLOYMENT_GUIDE.md for detailed information.**
