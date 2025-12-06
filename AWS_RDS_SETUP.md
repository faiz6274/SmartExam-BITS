# AWS RDS PostgreSQL Configuration Guide for SmartExam

## 📋 Table of Contents

1. [AWS RDS Setup](#aws-rds-setup)
2. [Security Group Configuration](#security-group-configuration)
3. [Database Configuration](#database-configuration)
4. [Connection Testing](#connection-testing)
5. [Django Configuration](#django-configuration)
6. [Migration & Data Setup](#migration--data-setup)
7. [Troubleshooting](#troubleshooting)

---

## AWS RDS Setup

### Step 1: Create RDS Instance (if not already created)

1. **Log into AWS Console:**

   - Go to https://console.aws.amazon.com/
   - Navigate to RDS Service

2. **Create Database Instance:**

   - Click "Create database"
   - **Engine:** PostgreSQL
   - **Engine Version:** 13.x or higher
   - **Instance Class:** db.t3.micro (free tier eligible)
   - **Storage:** 20 GB (free tier)
   - **Instance Identifier:** smartexam
   - **Master Username:** postgresmart
   - **Master Password:** WinterStart03

3. **Network Configuration:**

   - **VPC:** Default VPC
   - **Publicly Accessible:** YES (for development)
   - **VPC Security Group:** Create new or use existing
   - **Database Name:** smartexam-mrp

4. **Click "Create database"**
   - Wait for instance to be "Available" (5-10 minutes)

---

## Security Group Configuration

### Step 1: Find Your RDS Endpoint

1. Go to RDS Dashboard
2. Click on your instance (smartexam)
3. Copy the **Endpoint** (e.g., `smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com`)
4. Note the **Port** (default: 5432)

### Step 2: Configure Security Group

#### Option A: Allow from Your IP (More Secure)

1. **Find your public IP:**

   - Go to https://whatismyipaddress.com/
   - Copy your IP address

2. **Update Security Group:**
   - Go to EC2 → Security Groups
   - Find the RDS security group
   - Edit Inbound Rules
   - Add Rule:
     ```
     Type: PostgreSQL
     Protocol: TCP
     Port Range: 5432
     Source: YOUR_IP/32 (e.g., 192.168.1.100/32)
     ```
   - Save

#### Option B: Allow All (Less Secure - For Testing Only)

1. Go to EC2 → Security Groups
2. Find the RDS security group
3. Edit Inbound Rules
4. Add Rule:
   ```
   Type: PostgreSQL
   Protocol: TCP
   Port Range: 5432
   Source: 0.0.0.0/0 (Allow from anywhere)
   ```
5. Save

**⚠️ WARNING:** Option B is NOT recommended for production!

---

## Database Configuration

### Your AWS RDS Credentials (Already in `.env`)

```env
POSTGRES_HOST=smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com
POSTGRES_PORT=5432
POSTGRES_DB=smartexam-mrp
POSTGRES_USER=postgresmart
POSTGRES_PASSWORD=WinterStart03
```

---

## Connection Testing

### Test 1: Using psql (Command Line)

```bash
# Install PostgreSQL client (if not already installed)
# Windows: Download from https://www.postgresql.org/download/windows/

# Test connection
psql -h smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com \
     -U postgresmart \
     -d smartexam-mrp \
     -p 5432
```

Expected output:

```
Password for user postgresmart:
smartexam-mrp=>
```

### Test 2: Using Python

```python
import psycopg2

try:
    conn = psycopg2.connect(
        host="smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com",
        database="smartexam-mrp",
        user="postgresmart",
        password="WinterStart03",
        port="5432"
    )

    cursor = conn.cursor()
    cursor.execute("SELECT version();")
    db_version = cursor.fetchone()
    print(f"✓ Connected! Database version: {db_version}")

    conn.close()

except Exception as e:
    print(f"✗ Connection failed: {e}")
```

Run it:

```bash
python -c "script_above"
```

### Test 3: Using Django

```bash
cd SmartExam_Backend

# Set to use AWS database
set USE_LOCAL_DB=false

# Check database connection
python manage.py dbshell
```

You should get a PostgreSQL prompt:

```
smartexam-mrp=>
```

---

## Django Configuration

### Step 1: Update `.env` File

```env
# Set to false to use AWS RDS
USE_LOCAL_DB=false

# AWS RDS Configuration
POSTGRES_DB=smartexam-mrp
POSTGRES_USER=postgresmart
POSTGRES_PASSWORD=WinterStart03
POSTGRES_HOST=smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com
POSTGRES_PORT=5432

# Other Django Settings
DEBUG=1
DJANGO_SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1,10.0.2.2,192.168.1.30
```

### Step 2: Verify Django Settings

Check `backend/settings.py`:

```python
USE_LOCAL_DB = os.getenv('USE_LOCAL_DB', 'true').lower() == 'true'

if not USE_LOCAL_DB:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.getenv('POSTGRES_DB', 'smartexam-mrp'),
            'USER': os.getenv('POSTGRES_USER', 'postgresmart'),
            'PASSWORD': os.getenv('POSTGRES_PASSWORD', 'WinterStart03'),
            'HOST': os.getenv('POSTGRES_HOST', 'smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com'),
            'PORT': os.getenv('POSTGRES_PORT', '5432'),
            'OPTIONS': {
                'sslmode': 'require',
            }
        }
    }
```

---

## Migration & Data Setup

### Step 1: Apply Migrations to AWS

```powershell
cd SmartExam_Backend

# Set environment variable
$env:USE_LOCAL_DB = "false"

# Apply migrations
python manage.py migrate

# Expected output:
# Operations to perform:
#   Apply all migrations: admin, api, auth, contenttypes, sessions, token_blacklist
# Running migrations:
#   Applying admin...
#   ... (more migrations)
# All migrations completed successfully
```

### Step 2: Create Test Users on AWS

```powershell
# Run the test user creation script
python create_test_users.py

# Expected output:
# Creating test users...
# ✓ Created user: irfan (student)
# ✓ Created user: instructor1 (instructor)
# ✓ Created user: student1 (student)
```

### Step 3: Verify Data

```powershell
# Check that users were created
python manage.py shell

# In the Django shell:
from django.contrib.auth import get_user_model
User = get_user_model()
print(User.objects.all().values_list('username', 'role'))

# Expected output:
# <QuerySet [('irfan', 'student'), ('instructor1', 'instructor'), ('student1', 'student')]>
```

---

## Running Django with AWS RDS

### Start the Server

```powershell
cd SmartExam_Backend

# Set to use AWS database
$env:USE_LOCAL_DB = "false"

# Start server
python manage.py runserver --noreload 0.0.0.0:8000
```

Expected startup:

```
Performing system checks...
System check identified no issues (0 silenced).
December 07, 2025 - 14:30:00
Django version 4.2, using settings 'backend.settings'
Starting development server at http://0.0.0.0:8000/
Database: PostgreSQL (AWS RDS)
Quit the server with CTRL-BREAK.
```

---

## Troubleshooting

### Error 1: "could not translate host name to address: Unknown host"

**Cause:** Network connectivity issue or hostname is incorrect

**Solutions:**

```bash
# Test ping
ping smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com

# Test DNS resolution
nslookup smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com

# Verify endpoint from AWS console
```

### Error 2: "FATAL: no pg_hba.conf entry for host"

**Cause:** Security group not configured properly

**Solutions:**

1. Go to AWS RDS Dashboard
2. Click your instance
3. Click "Security groups"
4. Edit inbound rules
5. Add PostgreSQL rule for your IP
6. Save and wait 1-2 minutes

### Error 3: "authentication failed for user"

**Cause:** Wrong username or password

**Solutions:**

```bash
# Verify credentials in .env file
# Check AWS RDS console for correct master username
# Reset password if forgotten:
#   - RDS Dashboard → Select instance → Modify
#   - Change master password
#   - Apply immediately
```

### Error 4: "FATAL: database does not exist"

**Cause:** Database name is wrong or not created

**Solutions:**

```bash
# Verify database name from AWS console
# Create database if missing:
psql -h smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com \
     -U postgresmart \
     -p 5432 \
     -c "CREATE DATABASE \"smartexam-mrp\";"
```

### Error 5: "sslmode required but not supported"

**Cause:** SSL mode setting issue

**Solutions:**

```python
# In settings.py, update OPTIONS:
'OPTIONS': {
    'sslmode': 'require',
}

# Or try:
'OPTIONS': {
    'sslmode': 'allow',
}
```

---

## Backup & Restore

### Create RDS Snapshot (Backup)

1. Go to RDS Dashboard
2. Select your instance
3. Click "Actions" → "Create snapshot"
4. Give it a name: `smartexam-backup-2025-12-07`
5. Click "Create snapshot"

### Restore from Snapshot

1. Go to RDS Dashboard
2. Click "Snapshots"
3. Select your snapshot
4. Click "Actions" → "Restore from snapshot"
5. Follow the wizard

---

## Performance Tips

### For Development:

- Use **db.t3.micro** (free tier)
- 20 GB storage is enough
- Publicly accessible: YES

### For Production:

- Use **db.t3.small** or larger
- 100+ GB storage
- **Publicly accessible: NO**
- Use VPC with private subnets
- Enable automated backups (7-30 days)
- Enable Multi-AZ for high availability

---

## Quick Reference

| Item     | Value                                               |
| -------- | --------------------------------------------------- |
| Endpoint | smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com |
| Port     | 5432                                                |
| Database | smartexam-mrp                                       |
| Username | postgresmart                                        |
| Password | WinterStart03                                       |
| Engine   | PostgreSQL                                          |
| Region   | ap-south-1 (Mumbai)                                 |

---

## Next Steps

1. ✅ Create RDS instance (if not done)
2. ✅ Configure security group
3. ✅ Test connection with psql
4. ✅ Update `.env` with `USE_LOCAL_DB=false`
5. ✅ Run migrations: `python manage.py migrate`
6. ✅ Create test users: `python create_test_users.py`
7. ✅ Start Django server: `python manage.py runserver`
8. ✅ Test with frontend app

---

**Ready to deploy to AWS RDS? Follow these steps and you'll be connected! 🚀**
