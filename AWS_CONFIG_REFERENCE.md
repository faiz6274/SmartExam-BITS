# AWS Configuration - Quick Reference

## 🎯 What You Need to Do

You have **3 things to deploy**:

### 1️⃣ Database (AWS RDS PostgreSQL)

- ✅ Already created in AWS
- 📍 Endpoint: `smartexam-db.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com`
- 🔑 Credentials in `.env` file

### 2️⃣ Backend (AWS EC2)

- ⏳ Need to create new instance
- ⚙️ Upload code + configure
- 📡 Listen on port 80

### 3️⃣ APK

- 🔄 Configure API URL
- 📦 Build with EAS
- 📲 Install on phone

---

## 🔧 Configuration Files

### Backend Configuration (Already Ready)

**File: `SmartExam_Backend/.env`**

```env
USE_LOCAL_DB=false                                           # Switch to AWS RDS
POSTGRES_DB=smartexam-mrp
POSTGRES_USER=postgresmart
POSTGRES_PASSWORD=WinterStart03
POSTGRES_HOST=smartexam-db.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com
POSTGRES_PORT=5432
DEBUG=False                                                   # Set to False for production
DJANGO_SECRET_KEY=your-secret-key-12345                     # Generate new one
ALLOWED_HOSTS=your-ec2-ip.compute-1.amazonaws.com           # Update with EC2 IP
```

### Frontend Configuration (Updated)

**File: `SmartExam_Frontend/src/api/axios.js`**

```javascript
// LOCAL DEVELOPMENT
const USE_LOCAL_BACKEND = true;
const LOCAL_BACKEND_URL = "http://10.0.2.2:8000/api/";

// AWS PRODUCTION
const AWS_BACKEND_URL = "http://your-ec2-public-ip/api/";

// SWITCH THIS:
const USE_LOCAL_BACKEND = true; // ← Change to false for AWS
```

---

## 📦 What Gets Deployed Where

```
YOUR COMPUTER
├── SmartExam_Frontend/
│   ├── src/api/axios.js         ← Configured with AWS URL
│   └── ... (build → APK)
└── SmartExam_Backend/
    └── .env                       ← Ready for AWS RDS

                    ↓ UPLOAD

AWS CLOUD
├── RDS PostgreSQL (Database)
│   └── smartexam-mrp
│
└── EC2 Instance (Backend Server)
    ├── Python virtual environment
    ├── Django server (Gunicorn)
    ├── Nginx reverse proxy
    └── Supervisor (process manager)

                    ↓ CONNECTS

USER'S PHONE
└── SmartExam APK
    ├── Login
    ├── Scan & Submit
    └── View Submissions
```

---

## 🚀 Deployment Timeline

### Step 1: Create RDS (Already Done ✅)

```
Status: ✅ Database ready at smartexam-db.XXXXX.rds.amazonaws.com
Credentials: postgresmart / WinterStart03
```

### Step 2: Create EC2 (Need to Do)

```
1. Create Ubuntu 22.04 instance (t2.micro, free tier)
2. Note public IP: ec2-XX-XX-XX-XX.compute-1.amazonaws.com
3. Download key pair: smartexam-key.pem
```

### Step 3: Deploy Backend (Need to Do)

```
1. SSH into EC2
2. Install dependencies (Python, PostgreSQL, Nginx, etc.)
3. Clone repository
4. Update .env with:
   - POSTGRES_HOST: your RDS endpoint
   - ALLOWED_HOSTS: your EC2 IP
5. Run migrations
6. Start with Supervisor + Nginx
```

### Step 4: Build APK (Need to Do)

```
1. Update axios.js:
   - USE_LOCAL_BACKEND = false
   - AWS_BACKEND_URL = "http://your-ec2-ip/api/"
2. Build with EAS: eas build --platform android
3. Download APK
4. Install on phone
```

---

## 📋 Environment Variables Summary

### RDS Connection

| Variable            | Current Value                          | Where Used     |
| ------------------- | -------------------------------------- | -------------- |
| `POSTGRES_HOST`     | `smartexam-db.XXXXX.rds.amazonaws.com` | Backend `.env` |
| `POSTGRES_DB`       | `smartexam-mrp`                        | Backend `.env` |
| `POSTGRES_USER`     | `postgresmart`                         | Backend `.env` |
| `POSTGRES_PASSWORD` | `WinterStart03`                        | Backend `.env` |
| `POSTGRES_PORT`     | `5432`                                 | Backend `.env` |

### Backend Server

| Variable            | Value         | Action                           |
| ------------------- | ------------- | -------------------------------- |
| `ALLOWED_HOSTS`     | `your-ec2-ip` | Add EC2 IP to backend `.env`     |
| `DEBUG`             | `False`       | Set in backend `.env`            |
| `DJANGO_SECRET_KEY` | Random string | Generate & set in backend `.env` |

### Frontend Connection

| Variable            | Value                     | Action                        |
| ------------------- | ------------------------- | ----------------------------- |
| `USE_LOCAL_BACKEND` | `false`                   | Change in frontend `axios.js` |
| `AWS_BACKEND_URL`   | `http://your-ec2-ip/api/` | Update EC2 IP in `axios.js`   |

---

## 🔄 Example Walkthrough

### Before Deployment

```javascript
// Frontend axios.js
const USE_LOCAL_BACKEND = true; // Using local
const API_BASE = "http://10.0.2.2:8000/api/";
```

### After Deployment

```javascript
// Frontend axios.js
const USE_LOCAL_BACKEND = false; // Using AWS
const AWS_BACKEND_URL = "http://54.123.45.67/api/"; // EC2 IP
const API_BASE = "http://54.123.45.67/api/";
```

### Backend .env

```env
USE_LOCAL_DB=false                                  # RDS enabled
POSTGRES_HOST=smartexam-db.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com
POSTGRES_USER=postgresmart
ALLOWED_HOSTS=54.123.45.67,your-domain.com
```

---

## 🧪 Testing After Deployment

### Test 1: Backend is Running

```powershell
# From your computer
curl -X GET "http://your-ec2-ip/api/login/"

# Should return:
# {"detail": "Method \"GET\" not allowed."}
```

### Test 2: Database Connection

```bash
# From EC2 instance
psql -h smartexam-db.XXXXX.rds.amazonaws.com \
     -U postgresmart \
     -d smartexam-mrp

# Should show: smartexam-mrp=>
```

### Test 3: APK Login

```
1. Open APK on phone
2. Enter: username=irfan, password=Irfan123!
3. Should see home screen
4. Phone should be communicating with AWS backend ✅
```

---

## 📱 APK Building Commands

### For Local Development

```powershell
cd SmartExam_Frontend
# Make sure USE_LOCAL_BACKEND = true in axios.js
eas build --platform android
```

### For AWS Production

```powershell
cd SmartExam_Frontend
# 1. Update axios.js
#    - Change USE_LOCAL_BACKEND = false
#    - Update AWS_BACKEND_URL = "http://your-ec2-ip/api/"
# 2. Build
eas build --platform android
# 3. Download APK
```

---

## 🔐 Security Checklist

Before going to production:

- [ ] Change `POSTGRES_PASSWORD` from `WinterStart03`
- [ ] Change `DJANGO_SECRET_KEY` to something random
- [ ] Set `DEBUG=False` in backend `.env`
- [ ] Restrict RDS security group (don't allow 0.0.0.0/0)
- [ ] Restrict EC2 SSH (allow only your IP)
- [ ] Use HTTPS instead of HTTP
- [ ] Enable RDS automated backups
- [ ] Rotate AWS credentials
- [ ] Keep `.env` files out of Git

---

## 🆘 Quick Troubleshooting

| Problem                | Check                                                    |
| ---------------------- | -------------------------------------------------------- |
| APK can't connect      | `USE_LOCAL_BACKEND = false` in axios.js                  |
| Backend not responding | EC2 instance running + Nginx active + port 80 open       |
| Database errors        | RDS in "Available" state + security group allows traffic |
| Migration fails        | RDS endpoint correct + credentials valid                 |
| "502 Bad Gateway"      | Gunicorn running (check with supervisorctl)              |

---

## 📚 Where to Find More Info

| Topic                 | File                      |
| --------------------- | ------------------------- |
| Step-by-step commands | `QUICK_AWS_SETUP.md`      |
| Detailed architecture | `AWS_DEPLOYMENT_GUIDE.md` |
| RDS setup only        | `AWS_RDS_SETUP.md`        |
| APK building          | `BUILD_APK_GUIDE.md`      |

---

## ✨ Key Takeaways

1. **Database:** ✅ Already ready (RDS PostgreSQL)
2. **Backend:** ⏳ Need to deploy to EC2
3. **Frontend:** ⏳ Need to update API URL + build APK
4. **Time:** ~1 hour total
5. **Cost:** Free for 12 months (Free Tier)

---

## 🎯 Start Here

Follow `QUICK_AWS_SETUP.md` in order:

1. Phase 1: RDS (already done, just verify)
2. Phase 2: EC2 setup (new EC2 instance)
3. Phase 3: APK configuration & build
4. Phase 4: Testing & verification

**Ready? Open QUICK_AWS_SETUP.md and follow Phase 2! 🚀**
