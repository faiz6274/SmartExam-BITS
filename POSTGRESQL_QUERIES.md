# SmartExam PostgreSQL SQL Queries for AWS

## This file contains all SQL queries needed to set up and manage your SmartExam application in AWS RDS

---

## 📋 TABLE OF CONTENTS

1. [Database Setup](#database-setup)
2. [Table Creation](#table-creation)
3. [Indexes](#indexes)
4. [Test Data](#test-data)
5. [Useful Queries](#useful-queries)
6. [Backup & Restore](#backup--restore)

---

## DATABASE SETUP

### Connect to AWS RDS

```sql
-- Connection Parameters:
-- Host: smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com
-- Port: 5432
-- Username: postgresmart
-- Password: WinterStart03
-- Database: smartexam-mrp
```

### Test Connection

```bash
psql -h smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com \
     -U postgresmart \
     -d smartexam-mrp \
     -p 5432
```

---

## TABLE CREATION

### 1. Users Table (Custom Auth User)

```sql
-- This is automatically created by Django, but here's the schema

CREATE TABLE IF NOT EXISTS auth_user (
    id SERIAL PRIMARY KEY,
    password VARCHAR(128) NOT NULL,
    last_login TIMESTAMP,
    is_superuser BOOLEAN NOT NULL DEFAULT FALSE,
    username VARCHAR(150) UNIQUE NOT NULL,
    first_name VARCHAR(150) NOT NULL DEFAULT '',
    last_name VARCHAR(150) NOT NULL DEFAULT '',
    email VARCHAR(254) UNIQUE NOT NULL,
    is_staff BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    date_joined TIMESTAMP NOT NULL DEFAULT NOW(),
    role VARCHAR(20) NOT NULL DEFAULT 'student',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Exams Table

```sql
CREATE TABLE IF NOT EXISTS api_exam (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructor_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    duration_minutes INTEGER DEFAULT 60,
    passing_score FLOAT DEFAULT 0.6,
    is_published BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (instructor_id) REFERENCES auth_user(id) ON DELETE CASCADE
);
```

### 3. Questions Table

```sql
CREATE TABLE IF NOT EXISTS api_question (
    id SERIAL PRIMARY KEY,
    exam_id INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    question_type VARCHAR(20) NOT NULL,
    points FLOAT DEFAULT 1.0,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (exam_id) REFERENCES api_exam(id) ON DELETE CASCADE
);
```

### 4. Submissions Table

```sql
CREATE TABLE IF NOT EXISTS api_submission (
    id SERIAL PRIMARY KEY,
    exam_id INTEGER NOT NULL,
    student_id INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'in_progress',
    score FLOAT,
    page_count INTEGER DEFAULT 0,
    submitted_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (exam_id) REFERENCES api_exam(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES auth_user(id) ON DELETE CASCADE,
    UNIQUE(exam_id, student_id)
);
```

### 5. Submission Files Table

```sql
CREATE TABLE IF NOT EXISTS api_submissionfile (
    id SERIAL PRIMARY KEY,
    submission_id INTEGER NOT NULL,
    file VARCHAR(100) NOT NULL,
    uploaded_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (submission_id) REFERENCES api_submission(id) ON DELETE CASCADE
);
```

### 6. Comments Table

```sql
CREATE TABLE IF NOT EXISTS api_comment (
    id SERIAL PRIMARY KEY,
    submission_id INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (submission_id) REFERENCES api_submission(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES auth_user(id) ON DELETE CASCADE
);
```

### 7. Django Migrations Table

```sql
CREATE TABLE IF NOT EXISTS django_migrations (
    id SERIAL PRIMARY KEY,
    app VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    applied TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### 8. Django Sessions Table

```sql
CREATE TABLE IF NOT EXISTS django_session (
    session_key VARCHAR(40) PRIMARY KEY,
    session_data TEXT NOT NULL,
    expire_date TIMESTAMP NOT NULL
);
```

---

## INDEXES

```sql
-- User Indexes
CREATE INDEX IF NOT EXISTS idx_user_username ON auth_user(username);
CREATE INDEX IF NOT EXISTS idx_user_email ON auth_user(email);
CREATE INDEX IF NOT EXISTS idx_user_role ON auth_user(role);

-- Exam Indexes
CREATE INDEX IF NOT EXISTS idx_exam_instructor ON api_exam(instructor_id);
CREATE INDEX IF NOT EXISTS idx_exam_published ON api_exam(is_published);

-- Question Indexes
CREATE INDEX IF NOT EXISTS idx_question_exam ON api_question(exam_id);
CREATE INDEX IF NOT EXISTS idx_question_order ON api_question("order");

-- Submission Indexes
CREATE INDEX IF NOT EXISTS idx_submission_exam ON api_submission(exam_id);
CREATE INDEX IF NOT EXISTS idx_submission_student ON api_submission(student_id);
CREATE INDEX IF NOT EXISTS idx_submission_status ON api_submission(status);
CREATE INDEX IF NOT EXISTS idx_submission_submitted_at ON api_submission(submitted_at);

-- Submission File Indexes
CREATE INDEX IF NOT EXISTS idx_submissionfile_submission ON api_submissionfile(submission_id);

-- Comment Indexes
CREATE INDEX IF NOT EXISTS idx_comment_submission ON api_comment(submission_id);
CREATE INDEX IF NOT EXISTS idx_comment_author ON api_comment(author_id);
```

---

## TEST DATA

### 1. Create Test Users

```sql
-- Admin User
INSERT INTO auth_user (
    password, username, email, is_staff, is_superuser, is_active, role, date_joined
) VALUES (
    'pbkdf2_sha256$...', 'admin', 'admin@smartexam.com', TRUE, TRUE, TRUE, 'admin', NOW()
) ON CONFLICT DO NOTHING;

-- Instructor User
INSERT INTO auth_user (
    password, username, email, is_staff, is_active, role, date_joined
) VALUES (
    'pbkdf2_sha256$...', 'instructor1', 'instructor@smartexam.com', FALSE, TRUE, 'instructor', NOW()
) ON CONFLICT DO NOTHING;

-- Student Users
INSERT INTO auth_user (
    password, username, email, is_active, role, date_joined
) VALUES
    ('pbkdf2_sha256$...', 'irfan', 'irfan@smartexam.com', TRUE, 'student', NOW()),
    ('pbkdf2_sha256$...', 'student1', 'student1@smartexam.com', TRUE, 'student', NOW()),
    ('pbkdf2_sha256$...', 'student2', 'student2@smartexam.com', TRUE, 'student', NOW())
ON CONFLICT DO NOTHING;
```

### 2. Create Sample Exam

```sql
-- First, get the instructor_id
-- Assuming instructor1 has id = 2 (adjust based on actual data)

INSERT INTO api_exam (
    title, description, instructor_id, duration_minutes, passing_score, is_published
) VALUES (
    'Mid-Term Exam 2025',
    'Comprehensive mid-term examination for all students',
    2,
    120,
    0.6,
    TRUE
) RETURNING id;
```

### 3. Create Sample Questions

```sql
-- Assuming exam_id = 1
INSERT INTO api_question (
    exam_id, question_text, question_type, points, "order"
) VALUES
    (1, 'What is 2 + 2?', 'multiple_choice', 1.0, 1),
    (1, 'Explain the solar system', 'essay', 5.0, 2),
    (1, 'Define photosynthesis', 'short_answer', 2.0, 3);
```

### 4. Create Sample Submissions

```sql
-- Student 3 submits exam 1
INSERT INTO api_submission (
    exam_id, student_id, status, score, page_count, submitted_at
) VALUES
    (1, 3, 'submitted', NULL, 5, NOW()),
    (1, 4, 'submitted', NULL, 3, NOW()),
    (1, 5, 'submitted', NULL, 7, NOW());
```

### 5. Add Comments to Submissions

```sql
-- Instructor reviews submission (assuming submission_id = 1)
INSERT INTO api_comment (
    submission_id, author_id, text
) VALUES
    (1, 2, 'Great work! Your answers are well-structured.'),
    (1, 2, 'Could improve on question 3. See my feedback.');
```

---

## USEFUL QUERIES

### 1. View All Users by Role

```sql
SELECT id, username, email, role, date_joined
FROM auth_user
ORDER BY role, date_joined DESC;
```

### 2. View Active Instructors

```sql
SELECT id, username, email, date_joined
FROM auth_user
WHERE role = 'instructor' AND is_active = TRUE
ORDER BY date_joined;
```

### 3. View All Students

```sql
SELECT id, username, email, date_joined, is_active
FROM auth_user
WHERE role = 'student'
ORDER BY username;
```

### 4. Get All Exams with Instructor Names

```sql
SELECT
    e.id,
    e.title,
    u.username as instructor,
    e.duration_minutes,
    e.is_published,
    e.created_at,
    COUNT(s.id) as total_submissions
FROM api_exam e
JOIN auth_user u ON e.instructor_id = u.id
LEFT JOIN api_submission s ON e.id = s.exam_id
GROUP BY e.id, u.username
ORDER BY e.created_at DESC;
```

### 5. Get Exam Details with Questions

```sql
SELECT
    e.id,
    e.title,
    e.description,
    COUNT(q.id) as total_questions,
    SUM(q.points) as total_points
FROM api_exam e
LEFT JOIN api_question q ON e.id = q.exam_id
GROUP BY e.id
ORDER BY e.created_at DESC;
```

### 6. View Student Submissions for an Exam

```sql
SELECT
    s.id,
    u.username,
    e.title as exam,
    s.status,
    s.score,
    s.page_count,
    s.submitted_at
FROM api_submission s
JOIN auth_user u ON s.student_id = u.id
JOIN api_exam e ON s.exam_id = e.id
WHERE e.id = 1  -- Replace 1 with exam_id
ORDER BY s.submitted_at DESC;
```

### 7. View Submission with Files and Comments

```sql
SELECT
    s.id as submission_id,
    u.username as student,
    e.title as exam,
    s.status,
    s.score,
    s.page_count,
    COUNT(f.id) as total_files,
    COUNT(c.id) as total_comments
FROM api_submission s
JOIN auth_user u ON s.student_id = u.id
JOIN api_exam e ON s.exam_id = e.id
LEFT JOIN api_submissionfile f ON s.id = f.submission_id
LEFT JOIN api_comment c ON s.id = c.submission_id
WHERE s.id = 1  -- Replace 1 with submission_id
GROUP BY s.id, u.username, e.title;
```

### 8. View Comments on a Submission

```sql
SELECT
    c.id,
    u.username as author,
    c.text,
    c.created_at,
    c.updated_at
FROM api_comment c
JOIN auth_user u ON c.author_id = u.id
WHERE c.submission_id = 1  -- Replace 1 with submission_id
ORDER BY c.created_at;
```

### 9. Get Exam Submission Statistics

```sql
SELECT
    e.title,
    COUNT(s.id) as total_submissions,
    SUM(CASE WHEN s.status = 'submitted' THEN 1 ELSE 0 END) as submitted,
    SUM(CASE WHEN s.status = 'graded' THEN 1 ELSE 0 END) as graded,
    AVG(s.score) as average_score,
    MIN(s.score) as min_score,
    MAX(s.score) as max_score
FROM api_exam e
LEFT JOIN api_submission s ON e.id = s.exam_id
GROUP BY e.id, e.title
ORDER BY e.created_at DESC;
```

### 10. Get Pending Submissions (Not Yet Graded)

```sql
SELECT
    s.id,
    u.username,
    e.title,
    s.submitted_at,
    s.page_count
FROM api_submission s
JOIN auth_user u ON s.student_id = u.id
JOIN api_exam e ON s.exam_id = e.id
WHERE s.status = 'submitted'
ORDER BY s.submitted_at;
```

### 11. Update Submission Status

```sql
-- Mark submission as graded
UPDATE api_submission
SET status = 'graded', score = 85.5
WHERE id = 1;

-- Or bulk update all submissions for an exam to graded
UPDATE api_submission
SET status = 'graded'
WHERE exam_id = 1 AND status = 'submitted';
```

### 12. Get Student Grade Report

```sql
SELECT
    u.username,
    e.title as exam,
    s.score,
    q.total_points,
    ROUND((s.score / q.total_points * 100)::NUMERIC, 2) as percentage,
    CASE
        WHEN (s.score / q.total_points) >= e.passing_score THEN 'PASS'
        ELSE 'FAIL'
    END as result
FROM api_submission s
JOIN auth_user u ON s.student_id = u.id
JOIN api_exam e ON s.exam_id = e.id
LEFT JOIN (
    SELECT exam_id, SUM(points) as total_points
    FROM api_question
    GROUP BY exam_id
) q ON e.id = q.exam_id
WHERE s.status = 'graded'
ORDER BY u.username, e.title;
```

### 13. Get Student Submission History

```sql
SELECT
    e.title,
    s.status,
    s.score,
    s.page_count,
    s.submitted_at,
    s.created_at
FROM api_submission s
JOIN api_exam e ON s.exam_id = e.id
WHERE s.student_id = 3  -- Replace with student_id
ORDER BY s.submitted_at DESC;
```

### 14. Find Students Not Submitted Yet

```sql
SELECT
    u.id,
    u.username,
    u.email
FROM auth_user u
WHERE u.role = 'student' AND u.is_active = TRUE
AND u.id NOT IN (
    SELECT DISTINCT student_id FROM api_submission WHERE exam_id = 1
)
ORDER BY u.username;
```

### 15. Get Recent Comments (Last 24 Hours)

```sql
SELECT
    c.id,
    u.username as author,
    s.id as submission_id,
    e.title as exam,
    c.text,
    c.created_at
FROM api_comment c
JOIN auth_user u ON c.author_id = u.id
JOIN api_submission s ON c.submission_id = s.id
JOIN api_exam e ON s.exam_id = e.id
WHERE c.created_at >= NOW() - INTERVAL '24 hours'
ORDER BY c.created_at DESC;
```

---

## BACKUP & RESTORE

### 1. Backup Database (From Local Machine)

```bash
# Full backup
pg_dump -h smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com \
        -U postgresmart \
        -d smartexam-mrp \
        -p 5432 \
        --format=custom \
        --file=smartexam_backup_$(date +%Y%m%d_%H%M%S).dump

# SQL format backup
pg_dump -h smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com \
        -U postgresmart \
        -d smartexam-mrp \
        -p 5432 \
        --format=plain \
        --file=smartexam_backup_$(date +%Y%m%d_%H%M%S).sql
```

### 2. Restore Database

```bash
# From custom format
pg_restore -h smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com \
           -U postgresmart \
           -d smartexam-mrp \
           -p 5432 \
           smartexam_backup_20251215_120000.dump

# From SQL format
psql -h smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com \
     -U postgresmart \
     -d smartexam-mrp \
     -p 5432 \
     -f smartexam_backup_20251215_120000.sql
```

### 3. Export Data to CSV

```sql
COPY (
    SELECT s.id, u.username, e.title, s.status, s.score, s.submitted_at
    FROM api_submission s
    JOIN auth_user u ON s.student_id = u.id
    JOIN api_exam e ON s.exam_id = e.id
) TO STDOUT WITH CSV HEADER;
```

---

## QUICK SETUP SCRIPT

Run this to set up everything at once:

```sql
-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create schema
CREATE SCHEMA IF NOT EXISTS smartexam;
SET search_path TO smartexam, public;

-- Then run the table creation queries above
-- And indexes
-- And test data
```

---

## MAINTENANCE QUERIES

### 1. Vacuum and Analyze

```sql
VACUUM ANALYZE;
```

### 2. Check Table Sizes

```sql
SELECT
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### 3. Monitor Active Queries

```sql
SELECT
    pid,
    usename,
    application_name,
    query,
    query_start
FROM pg_stat_activity
WHERE state = 'active'
ORDER BY query_start;
```

### 4. Kill Long-Running Queries

```sql
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE query_start < NOW() - INTERVAL '1 hour';
```

---

## NOTES

1. **Django will create tables automatically** when you run: `python manage.py migrate`
2. **Use these queries for reference** or direct database access
3. **Always test in development first** before running on production
4. **Keep backups** of your data regularly
5. **Monitor database performance** using AWS RDS dashboard

---

**Use these queries with AWS RDS PostgreSQL for your SmartExam application! 🚀**
