# Complete AWS Deployment Guide - Backend + Database + APK Connection

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [AWS RDS Setup (Database)](#aws-rds-setup-database)
3. [AWS EC2 Setup (Backend Server)](#aws-ec2-setup-backend-server)
4. [Alternative: AWS Elastic Beanstalk](#alternative-aws-elastic-beanstalk)
5. [Frontend APK Configuration](#frontend-apk-configuration)
6. [Environment Configuration](#environment-configuration)
7. [Testing & Deployment](#testing--deployment)
8. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

```
┌─────────────────────────┐
│   APK on Phone/Device   │
│  (SmartExam_Frontend)   │
└────────────┬────────────┘
             │ HTTPS
             ▼
┌─────────────────────────┐
│  AWS EC2 Instance       │
│  (Django Backend)       │
│  Port 8000/443          │
└────────────┬────────────┘
             │ TCP:5432
             ▼
┌─────────────────────────┐
│  AWS RDS PostgreSQL     │
│  (smartexam-mrp)        │
│  ap-south-1 Region      │
└─────────────────────────┘
```

---

## AWS RDS Setup (Database)

### Prerequisites

- AWS Account (Free Tier eligible)
- Your IP address (from https://whatismyipaddress.com/)

### Step 1: Create RDS Instance

1. **Log into AWS Console:** https://console.aws.amazon.com/
2. **Go to RDS Service** → Click "Create database"
3. **Engine Selection:**

   - Engine: **PostgreSQL**
   - Version: **13.x or higher** (preferably 14.x)
   - Templates: **Free tier**

4. **DB Instance Configuration:**

   ```
   Instance Identifier: smartexam-db
   Master Username: postgresmart
   Master Password: WinterStart03 (CHANGE THIS FOR PRODUCTION!)
   ```

5. **Storage:**

   ```
   Storage Type: General Purpose (SSD)
   Allocated Storage: 20 GB
   Storage Autoscaling: Enable
   ```

6. **Connectivity:**

   - VPC: Default VPC
   - Publicly Accessible: **YES**
   - VPC Security Group: Create new → Name: `smartexam-db-sg`
   - Database Name: `smartexam-mrp`

7. **Backup & Monitoring:**

   - Backup retention: 7 days
   - Enable Enhanced Monitoring

8. **Click "Create database"** → Wait 5-10 minutes for "Available" status

### Step 2: Configure Security Group

1. **Find your RDS Endpoint:**

   - RDS Dashboard → Instances → `smartexam-db`
   - Copy the Endpoint (e.g., `smartexam-db.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com`)

2. **Add Your IP to Security Group:**

   - EC2 Dashboard → Security Groups
   - Find `smartexam-db-sg`
   - Edit Inbound Rules
   - Add Rule:
     ```
     Type: PostgreSQL
     Protocol: TCP
     Port: 5432
     Source: YOUR_IP/32 (e.g., 203.0.113.45/32)
     ```
   - Save

3. **For EC2 (Backend) Access:**
   - Add another rule:
     ```
     Type: PostgreSQL
     Protocol: TCP
     Port: 5432
     Source: sg-XXXXX (EC2 security group - once created)
     ```

### Step 3: Test Database Connection

```powershell
# Install psql if needed: https://www.postgresql.org/download/windows/

psql -h smartexam-db.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com \
     -U postgresmart \
     -d smartexam-mrp \
     -p 5432

# Type password: WinterStart03
# Expected output: smartexam-mrp=>
```

---

## AWS EC2 Setup (Backend Server)

### Step 1: Create EC2 Instance

1. **Go to EC2 Dashboard** → Click "Launch Instances"

2. **AMI Selection:**

   - Choose: **Ubuntu Server 22.04 LTS** (Free Tier eligible)
   - Architecture: **64-bit (x86)**

3. **Instance Type:**

   - Type: **t2.micro** (Free Tier eligible)
   - Click "Next"

4. **Network Settings:**

   - VPC: Default
   - Auto-assign Public IP: **Enable**
   - Create Security Group: `smartexam-backend-sg`

5. **Security Group Inbound Rules:**

   ```
   SSH:  Port 22   from 0.0.0.0/0 (Your IP only for production!)
   HTTP: Port 80   from 0.0.0.0/0
   HTTPS: Port 443 from 0.0.0.0/0
   Custom: Port 8000 from 0.0.0.0/0 (For Django dev server)
   ```

6. **Key Pair:**

   - Create new: `smartexam-key`
   - Download and save securely: `smartexam-key.pem`
   - **Don't lose this file!**

7. **Click "Launch Instance"** → Wait for Running status

### Step 2: Connect to EC2 Instance

```powershell
# Set key permissions (Windows PowerShell as Admin)
$keyPath = "C:\path\to\smartexam-key.pem"
icacls $keyPath /inheritance:r
icacls $keyPath /grant:r "$env:USERNAME`:`(F`)"

# SSH into instance
$instanceIP = "ec2-XX-XXX-XXX-XXX.compute-1.amazonaws.com"
ssh -i $keyPath ubuntu@$instanceIP

# Or use PuTTY/MobaXterm for GUI
```

### Step 3: Install Dependencies

```bash
# Update system
sudo apt update
sudo apt upgrade -y

# Install Python & pip
sudo apt install -y python3 python3-pip python3-venv

# Install PostgreSQL client (to test DB connection)
sudo apt install -y postgresql-client

# Install Nginx (reverse proxy)
sudo apt install -y nginx

# Install Supervisor (process management)
sudo apt install -y supervisor

# Install git
sudo apt install -y git
```

### Step 4: Deploy Backend

```bash
# Clone repository
cd /home/ubuntu
git clone https://github.com/faiz6274/SmartExam-BITS.git
cd SmartExam-BITS/SmartExam_Backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python packages
pip install -r requirements.txt

# Create .env file
nano .env
```

Add to `.env`:

```env
DEBUG=False
DJANGO_SECRET_KEY=generate-a-secure-key-here
ALLOWED_HOSTS=your-ec2-domain.amazonaws.com,your-ip-address
USE_LOCAL_DB=false

# AWS RDS
POSTGRES_DB=smartexam-mrp
POSTGRES_USER=postgresmart
POSTGRES_PASSWORD=WinterStart03
POSTGRES_HOST=smartexam-db.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com
POSTGRES_PORT=5432

# AWS S3
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
AWS_STORAGE_BUCKET_NAME=smart-exam-mrp
AWS_S3_REGION_NAME=ap-south-1
```

### Step 5: Run Migrations

```bash
source venv/bin/activate
cd /home/ubuntu/SmartExam-BITS/SmartExam_Backend

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput
```

### Step 6: Configure Gunicorn

Create `/home/ubuntu/SmartExam-BITS/SmartExam_Backend/gunicorn_config.py`:

```python
import multiprocessing

bind = "127.0.0.1:8000"
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "sync"
max_requests = 1000
max_requests_jitter = 50
timeout = 60
keepalive = 5
```

### Step 7: Configure Supervisor

```bash
sudo nano /etc/supervisor/conf.d/smartexam.conf
```

Add:

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

Start Supervisor:

```bash
sudo systemctl restart supervisor
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start smartexam
```

### Step 8: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/smartexam
```

Add:

```nginx
upstream smartexam_app {
    server 127.0.0.1:8000;
}

server {
    listen 80;
    server_name your-ec2-domain.amazonaws.com;
    client_max_body_size 100M;

    location / {
        proxy_pass http://smartexam_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /home/ubuntu/SmartExam-BITS/SmartExam_Backend/static/;
    }

    location /media/ {
        alias /home/ubuntu/SmartExam-BITS/SmartExam_Backend/media/;
    }
}
```

Enable Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/smartexam /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 9: Get Elastic IP (Optional)

1. EC2 Dashboard → Elastic IPs
2. Click "Allocate Elastic IP"
3. Associate with your instance
4. Use this static IP for your domain

---

## Alternative: AWS Elastic Beanstalk

**Easier for beginners** (auto-handles deployment):

```powershell
# Install EB CLI
pip install awsebcli --upgrade --user

# Initialize
cd SmartExam_Backend
eb init -p python-3.11 smartexam-app

# Create environment
eb create smartexam-env

# Deploy
eb deploy

# Open
eb open
```

---

## Frontend APK Configuration

### Step 1: Update Axios Configuration

Update `SmartExam_Frontend/src/api/axios.js`:

```javascript
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Dynamic API base URL based on environment
let API_BASE;

// For production, use your AWS backend domain
const AWS_BACKEND_URL = "https://your-backend-domain.com/api/"; // Change this!
const LOCAL_BACKEND_URL = "http://10.0.2.2:8000/api/"; // For local testing

// Detect environment
const USE_LOCAL_BACKEND = __DEV__; // true in development, false in production build

if (Platform.OS === "android") {
  API_BASE = USE_LOCAL_BACKEND ? LOCAL_BACKEND_URL : AWS_BACKEND_URL;
} else if (Platform.OS === "ios") {
  API_BASE = USE_LOCAL_BACKEND ? "http://localhost:8000/api/" : AWS_BACKEND_URL;
} else {
  API_BASE = "http://localhost:8000/api/";
}

console.log(`[API Config] Using backend: ${API_BASE}`);
console.log(
  `[API Config] Environment: ${USE_LOCAL_BACKEND ? "LOCAL" : "PRODUCTION"}`
);

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  xsrfCookieName: "",
  xsrfHeaderName: "",
});

// Rest of the file remains the same...
```

### Step 2: Create Environment-Specific Config

Create `SmartExam_Frontend/.env`:

```env
# Development
DEV_API_URL=http://10.0.2.2:8000/api/

# Production (AWS)
PROD_API_URL=https://your-backend-domain.com/api/
```

Update `app.json` to reference it:

```json
{
  "expo": {
    "name": "SmartExam",
    "slug": "smartexam",
    "version": "1.0.0",
    "extra": {
      "apiUrl": {
        "dev": "http://10.0.2.2:8000/api/",
        "prod": "https://your-backend-domain.com/api/"
      }
    }
  }
}
```

### Step 3: Use Configuration in Code

Update axios.js to use `expo-constants`:

```javascript
import Constants from "expo-constants";

const config = Constants.expoConfig?.extra || {};
const isDev = __DEV__;

const API_BASE = isDev
  ? config.apiUrl?.dev || "http://10.0.2.2:8000/api/"
  : config.apiUrl?.prod || "https://your-backend-domain.com/api/";
```

---

## Environment Configuration

### For Local Development:

```env
USE_LOCAL_DB=true
DEBUG=True
API_URL=http://10.0.2.2:8000/api/
```

### For AWS Staging:

```env
USE_LOCAL_DB=false
DEBUG=True
ALLOWED_HOSTS=your-ec2-instance.amazonaws.com
API_URL=http://your-ec2-instance.amazonaws.com/api/
```

### For AWS Production:

```env
USE_LOCAL_DB=false
DEBUG=False
ALLOWED_HOSTS=your-domain.com
API_URL=https://your-domain.com/api/
DJANGO_SECRET_KEY=generate-secure-key
```

---

## Testing & Deployment

### Step 1: Build APK with AWS Backend

```powershell
cd SmartExam_Frontend

# Update app.json with AWS backend URL
# eas build --platform android

# Or for local testing with AWS backend:
npm start -- --android
```

### Step 2: Test Backend Connectivity

```powershell
# Test from your computer
curl -X GET "https://your-backend-domain.com/api/login/"

# Should return:
# {"detail": "Method \"GET\" not allowed."}
```

### Step 3: Test From APK

1. Install APK on phone
2. Go to Login Screen
3. Check Console Logs:
   ```
   [API Config] Using backend: https://your-backend-domain.com/api/
   ```
4. Try login with test credentials
5. Should work with AWS backend!

### Step 4: Deploy to Google Play

1. Update version in `app.json`
2. Build production APK:
   ```powershell
   eas build --platform android --profile production
   ```
3. Upload to Google Play Store
4. Users will automatically connect to AWS backend

---

## Troubleshooting

### Issue 1: "Network Error: Cannot connect to backend"

**Solution:**

```powershell
# Check backend is running
curl -X GET "https://your-backend-domain.com/api/login/"

# Check security groups allow traffic
# AWS EC2 → Security Groups → Check Port 80/443

# Check DNS propagation
nslookup your-backend-domain.com
```

### Issue 2: "CORS Error from APK"

**Add to Django settings.py:**

```python
CORS_ALLOWED_ORIGINS = [
    "https://your-domain.com",
    "http://your-ec2-ip:8000",
]
```

### Issue 3: "Database Connection Failed"

**Check:**

1. RDS Security Group allows EC2 access
2. .env has correct credentials
3. RDS is in "Available" status

```bash
# From EC2, test connection:
psql -h smartexam-db.XXXXX.ap-south-1.rds.amazonaws.com \
     -U postgresmart -d smartexam-mrp
```

### Issue 4: "SSL Certificate Error"

**For local testing, disable SSL verification:**

```javascript
// In axios.js (development only!)
const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // ONLY FOR DEV!
  }),
});
```

### Issue 5: "502 Bad Gateway"

**Solution:**

```bash
# Check Gunicorn status
sudo supervisorctl status smartexam

# Check logs
tail -f /var/log/smartexam.err.log

# Restart
sudo supervisorctl restart smartexam
```

---

## Costs (AWS Free Tier)

| Service           | Free Tier       | Cost                   |
| ----------------- | --------------- | ---------------------- |
| EC2 (t2.micro)    | 750 hours/month | Free for 12 months     |
| RDS (db.t3.micro) | 750 hours/month | Free for 12 months     |
| Bandwidth         | 100 GB/month    | Free for 12 months     |
| **Total**         |                 | **~$0/month** (year 1) |

After free tier:

- EC2: ~$9-15/month
- RDS: ~$12-20/month
- Total: ~$25-35/month

---

## Security Checklist

- [ ] RDS: Change default password
- [ ] Django: Set `DEBUG=False` in production
- [ ] Django: Set strong `SECRET_KEY`
- [ ] EC2: Restrict SSH to your IP only
- [ ] RDS: Don't publicly expose (unless necessary)
- [ ] Enable SSL/TLS (HTTPS)
- [ ] Enable RDS backups (7-30 days)
- [ ] Enable EC2 monitoring
- [ ] Use AWS IAM roles (not hardcoded credentials)
- [ ] Rotate AWS access keys regularly

---

## Quick Deployment Checklist

- [ ] Create AWS Account
- [ ] Create RDS PostgreSQL instance
- [ ] Create EC2 Ubuntu instance
- [ ] Connect EC2 to RDS (security group)
- [ ] Deploy backend to EC2
- [ ] Run migrations on RDS
- [ ] Update frontend API URL
- [ ] Build APK
- [ ] Test on phone
- [ ] Upload to Google Play

---

**Your AWS deployment is ready! 🚀**
