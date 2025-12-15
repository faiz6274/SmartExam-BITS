# PostgreSQL Quick Reference for SmartExam AWS

## 📊 Database Connection Details

```
Host: smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com
Port: 5432
Database: smartexam-mrp
Username: postgresmart
Password: WinterStart03
Region: ap-south-1 (Mumbai)
```

---

## 🔗 Quick Commands

### Connect to Database

```bash
psql -h smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com \
     -U postgresmart \
     -d smartexam-mrp \
     -p 5432
```

### Run SQL Script

```bash
psql -h smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com \
     -U postgresmart \
     -d smartexam-mrp \
     -p 5432 \
     -f smartexam_setup.sql
```

### Backup Database

```bash
pg_dump -h smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com \
        -U postgresmart \
        -d smartexam-mrp \
        > smartexam_backup.sql
```

---

## 📚 SmartExam Tables

| Table                | Purpose                               | Records  |
| -------------------- | ------------------------------------- | -------- |
| `auth_user`          | Users (students, instructors, admins) | ~100s    |
| `api_exam`           | Exam definitions                      | ~10s     |
| `api_question`       | Exam questions                        | ~100s    |
| `api_submission`     | Student submissions                   | ~1000s   |
| `api_submissionfile` | Uploaded files                        | ~10,000s |
| `api_comment`        | Feedback comments                     | ~1000s   |

---

## 🎯 Key Queries

### 1. View All Users by Role

```sql
SELECT id, username, email, role FROM auth_user ORDER BY role;
```

### 2. View Exams

```sql
SELECT * FROM v_exams_with_stats;
```

### 3. View Student Submissions

```sql
SELECT * FROM v_student_submissions;
```

### 4. Get Grades

```sql
SELECT * FROM v_grade_report;
```

### 5. Pending Submissions

```sql
SELECT student, exam, submitted_at FROM v_student_submissions WHERE status = 'submitted';
```

### 6. Update Submission Score

```sql
UPDATE api_submission SET status = 'graded', score = 85 WHERE id = 1;
```

### 7. Add Comment

```sql
INSERT INTO api_comment (submission_id, author_id, text)
VALUES (1, 2, 'Great work!');
```

---

## 📊 Useful Views (Auto-Generated)

### v_exams_with_stats

Shows all exams with submission statistics

```sql
SELECT * FROM v_exams_with_stats;
```

### v_student_submissions

Shows all submissions with file and comment counts

```sql
SELECT * FROM v_student_submissions;
```

### v_grade_report

Shows grades, percentages, and pass/fail status

```sql
SELECT * FROM v_grade_report;
```

---

## 🔄 Django Operations

### Run Migrations

```bash
cd SmartExam_Backend
python manage.py migrate
```

### Create Superuser

```bash
python manage.py createsuperuser
```

### Create Test Data

```bash
python create_test_users.py
```

---

## 📈 Performance Tips

1. **Indexes are already created** for all foreign keys and common filters
2. **Run VACUUM ANALYZE** regularly:

   ```sql
   VACUUM ANALYZE;
   ```

3. **Monitor query performance**:

   ```sql
   EXPLAIN ANALYZE SELECT * FROM api_submission WHERE status = 'submitted';
   ```

4. **Use LIMIT in development**:
   ```sql
   SELECT * FROM api_submission LIMIT 10;
   ```

---

## 🔐 Security

- ✅ Change password in production
- ✅ Use SSL/TLS connections
- ✅ Restrict inbound security group
- ✅ Enable RDS backups
- ✅ Monitor access logs

---

## 🆘 Troubleshooting

### Can't Connect?

```bash
# Test DNS
nslookup smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com

# Check security group allows port 5432
# Check RDS instance status in AWS Console
```

### Slow Queries?

```sql
-- Analyze query plan
EXPLAIN ANALYZE SELECT * FROM api_submission WHERE student_id = 1;

-- Check missing indexes
SELECT * FROM pg_stat_user_indexes ORDER BY idx_blks_read DESC;
```

### Disk Space?

```sql
SELECT pg_size_pretty(pg_database_size('smartexam-mrp'));
```

---

## 📁 Files Provided

1. **POSTGRESQL_QUERIES.md** - Complete SQL reference (comprehensive)
2. **smartexam_setup.sql** - Ready-to-run setup script (indexes, views)
3. **This file** - Quick reference guide

---

## 🚀 Getting Started

### Step 1: Run Setup Script

```bash
psql -h smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com \
     -U postgresmart \
     -d smartexam-mrp \
     -f smartexam_setup.sql
```

### Step 2: Run Django Migrations

```bash
cd SmartExam_Backend
USE_LOCAL_DB=false python manage.py migrate
```

### Step 3: Start Application

```bash
python manage.py runserver
```

### Step 4: Access Database

```bash
psql -h smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com \
     -U postgresmart \
     -d smartexam-mrp
```

---

## ✅ Verification Queries

Run these to verify everything is set up correctly:

```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Check indexes
SELECT indexname FROM pg_indexes WHERE tablename LIKE 'api_%' OR tablename = 'auth_user';

-- Check views
SELECT viewname FROM pg_views WHERE schemaname = 'public';

-- Check functions
SELECT routine_name FROM information_schema.routines WHERE routine_schema = 'public';

-- Check row counts
SELECT 'auth_user' as table_name, COUNT(*) as rows FROM auth_user
UNION ALL
SELECT 'api_exam', COUNT(*) FROM api_exam
UNION ALL
SELECT 'api_submission', COUNT(*) FROM api_submission
UNION ALL
SELECT 'api_comment', COUNT(*) FROM api_comment;
```

---

## 📞 Support

- **AWS RDS Dashboard:** https://console.aws.amazon.com/rds/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Django Docs:** https://docs.djangoproject.com/

---

**Your SmartExam PostgreSQL database is ready! 🎉**
