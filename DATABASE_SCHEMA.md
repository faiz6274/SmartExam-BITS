# SmartExam PostgreSQL Database Schema

## 🗂️ Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SMARTEXAM DATABASE                           │
└─────────────────────────────────────────────────────────────────────┘

                           ┌──────────────────┐
                           │    auth_user     │
                           ├──────────────────┤
                           │ id (PK)          │
                           │ username (UQ)    │
                           │ email (UQ)       │
                           │ password         │
                           │ role             │
                           │ is_active        │
                           │ is_staff         │
                           │ date_joined      │
                           └────────┬─────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
          ┌─────────▼────────┐  ┌──▼──────────┐  ┌─▼────────────────┐
          │   api_exam       │  │  api_comment│  │ api_submission   │
          ├──────────────────┤  ├─────────────┤  ├──────────────────┤
          │ id (PK)          │  │ id (PK)     │  │ id (PK)          │
          │ title            │  │ author_id*  │  │ exam_id* (FK)    │
          │ description      │  │ submission_│  │ student_id* (FK) │
          │ instructor_id*   │  │   id* (FK) │  │ status           │
          │ duration_minutes │  │ text       │  │ score            │
          │ passing_score    │  │ created_at │  │ page_count       │
          │ is_published     │  │ updated_at │  │ submitted_at     │
          │ created_at       │  └─────────────┘  │ created_at       │
          │ updated_at       │                   │ updated_at       │
          └──────┬───────────┘                   └────────┬─────────┘
                 │                                        │
                 │                                        │
          ┌──────▼───────────────┐            ┌──────────▼──────────┐
          │   api_question       │            │ api_submissionfile  │
          ├──────────────────────┤            ├─────────────────────┤
          │ id (PK)              │            │ id (PK)             │
          │ exam_id* (FK)        │            │ submission_id* (FK) │
          │ question_text        │            │ file                │
          │ question_type        │            │ uploaded_at         │
          │ points               │            └─────────────────────┘
          │ order                │
          └──────────────────────┘

* = Foreign Key
PK = Primary Key
UQ = Unique
FK = Foreign Key
```

---

## 📋 Table Specifications

### 1. auth_user

**Purpose:** User accounts (students, instructors, admins)

| Column       | Type         | Constraints       | Description              |
| ------------ | ------------ | ----------------- | ------------------------ |
| id           | SERIAL       | PRIMARY KEY       | Unique user ID           |
| username     | VARCHAR(150) | UNIQUE, NOT NULL  | Login username           |
| email        | VARCHAR(254) | UNIQUE, NOT NULL  | User email               |
| password     | VARCHAR(128) | NOT NULL          | Hashed password          |
| first_name   | VARCHAR(150) |                   | First name               |
| last_name    | VARCHAR(150) |                   | Last name                |
| role         | VARCHAR(20)  | DEFAULT 'student' | student/instructor/admin |
| is_active    | BOOLEAN      | DEFAULT TRUE      | Account active status    |
| is_staff     | BOOLEAN      | DEFAULT FALSE     | Staff access             |
| is_superuser | BOOLEAN      | DEFAULT FALSE     | Admin access             |
| date_joined  | TIMESTAMP    | NOT NULL          | Registration date        |
| last_login   | TIMESTAMP    |                   | Last login time          |

**Indexes:**

- `idx_auth_user_username` - For login queries
- `idx_auth_user_email` - For email lookups
- `idx_auth_user_role` - For filtering by role

---

### 2. api_exam

**Purpose:** Exam definitions created by instructors

| Column           | Type         | Constraints    | Description              |
| ---------------- | ------------ | -------------- | ------------------------ |
| id               | SERIAL       | PRIMARY KEY    | Unique exam ID           |
| title            | VARCHAR(255) | NOT NULL       | Exam name                |
| description      | TEXT         |                | Exam description         |
| instructor_id    | INTEGER      | FK → auth_user | Exam creator             |
| duration_minutes | INTEGER      | DEFAULT 60     | Exam duration            |
| passing_score    | FLOAT        | DEFAULT 0.6    | Pass threshold (0-1)     |
| is_published     | BOOLEAN      | DEFAULT FALSE  | Exam visible to students |
| created_at       | TIMESTAMP    | NOT NULL       | Creation date            |
| updated_at       | TIMESTAMP    | NOT NULL       | Last update date         |

**Indexes:**

- `idx_api_exam_instructor_id` - For instructor's exams
- `idx_api_exam_is_published` - For published exams list

---

### 3. api_question

**Purpose:** Individual questions within an exam

| Column        | Type        | Constraints   | Description                        |
| ------------- | ----------- | ------------- | ---------------------------------- |
| id            | SERIAL      | PRIMARY KEY   | Question ID                        |
| exam_id       | INTEGER     | FK → api_exam | Parent exam                        |
| question_text | TEXT        | NOT NULL      | Question content                   |
| question_type | VARCHAR(20) | NOT NULL      | multiple_choice/short_answer/essay |
| points        | FLOAT       | DEFAULT 1.0   | Question points value              |
| order         | INTEGER     | DEFAULT 0     | Display order                      |

**Indexes:**

- `idx_api_question_exam_id` - For exam questions
- `idx_api_question_order` - For sorting questions

---

### 4. api_submission

**Purpose:** Student exam submissions

| Column                       | Type        | Constraints           | Description                         |
| ---------------------------- | ----------- | --------------------- | ----------------------------------- |
| id                           | SERIAL      | PRIMARY KEY           | Submission ID                       |
| exam_id                      | INTEGER     | FK → api_exam         | Submitted exam                      |
| student_id                   | INTEGER     | FK → auth_user        | Student who submitted               |
| status                       | VARCHAR(20) | DEFAULT 'in_progress' | in_progress/submitted/graded        |
| score                        | FLOAT       | NULL                  | Final grade                         |
| page_count                   | INTEGER     | DEFAULT 0             | Number of pages uploaded            |
| submitted_at                 | TIMESTAMP   | NULL                  | Submission time                     |
| created_at                   | TIMESTAMP   | NOT NULL              | Record creation time                |
| updated_at                   | TIMESTAMP   | NOT NULL              | Last update time                    |
| UNIQUE (exam_id, student_id) |             |                       | One submission per student per exam |

**Indexes:**

- `idx_api_submission_exam_id` - For exam submissions
- `idx_api_submission_student_id` - For student submissions
- `idx_api_submission_status` - For filtering by status
- `idx_api_submission_submitted_at` - For recent submissions

---

### 5. api_submissionfile

**Purpose:** Uploaded document files within a submission

| Column        | Type         | Constraints         | Description       |
| ------------- | ------------ | ------------------- | ----------------- |
| id            | SERIAL       | PRIMARY KEY         | File ID           |
| submission_id | INTEGER      | FK → api_submission | Parent submission |
| file          | VARCHAR(100) | NOT NULL            | File path in S3   |
| uploaded_at   | TIMESTAMP    | NOT NULL            | Upload timestamp  |

**Indexes:**

- `idx_api_submissionfile_submission_id` - For submission files

---

### 6. api_comment

**Purpose:** Feedback comments from instructors on submissions

| Column        | Type      | Constraints         | Description               |
| ------------- | --------- | ------------------- | ------------------------- |
| id            | SERIAL    | PRIMARY KEY         | Comment ID                |
| submission_id | INTEGER   | FK → api_submission | Submission being reviewed |
| author_id     | INTEGER   | FK → auth_user      | Instructor commenting     |
| text          | TEXT      | NOT NULL            | Comment content           |
| created_at    | TIMESTAMP | NOT NULL            | Comment creation time     |
| updated_at    | TIMESTAMP | NOT NULL            | Last edit time            |

**Indexes:**

- `idx_api_comment_submission_id` - For submission comments
- `idx_api_comment_author_id` - For instructor's comments

---

## 🔗 Relationships

### One-to-Many Relationships:

1. **auth_user → api_exam** (One instructor → Many exams created)
2. **api_exam → api_question** (One exam → Many questions)
3. **api_exam → api_submission** (One exam → Many submissions)
4. **auth_user → api_submission** (One student → Many submissions)
5. **api_submission → api_submissionfile** (One submission → Many files)
6. **api_submission → api_comment** (One submission → Many comments)
7. **auth_user → api_comment** (One instructor → Many comments)

### Unique Constraints:

- `auth_user.username` - Username must be unique
- `auth_user.email` - Email must be unique
- `(api_submission.exam_id, api_submission.student_id)` - One submission per student per exam

---

## 📊 Data Volume Estimates

| Table              | Typical Records | Storage  | Notes                                   |
| ------------------ | --------------- | -------- | --------------------------------------- |
| auth_user          | 100-1000        | ~100 KB  | Users                                   |
| api_exam           | 10-100          | ~10 KB   | Exams per semester                      |
| api_question       | 100-1000        | ~100 KB  | Questions across exams                  |
| api_submission     | 1000-10000      | ~1 MB    | Student submissions                     |
| api_submissionfile | 5000-50000      | ~1-10 GB | Uploaded documents (actual files in S3) |
| api_comment        | 500-5000        | ~500 KB  | Feedback comments                       |

---

## 🔐 Security Considerations

1. **Passwords:** Stored as hashed values using Django's encryption
2. **Foreign Keys:** Cascade delete for data integrity
3. **Role-Based Access:** Users filtered by role in queries
4. **Unique Constraints:** Prevent duplicate submissions
5. **Timestamps:** Track who did what and when

---

## 📈 Query Performance Patterns

### Common Queries (Optimized):

1. **Get Student's Submissions**

   ```sql
   SELECT * FROM api_submission WHERE student_id = ? ORDER BY submitted_at DESC;
   ```

   Uses: `idx_api_submission_student_id`

2. **Get Exam's Submissions**

   ```sql
   SELECT * FROM api_submission WHERE exam_id = ? AND status = 'submitted';
   ```

   Uses: `idx_api_submission_exam_id`, `idx_api_submission_status`

3. **Get Recent Submissions**

   ```sql
   SELECT * FROM api_submission WHERE submitted_at >= NOW() - INTERVAL '24 hours';
   ```

   Uses: `idx_api_submission_submitted_at`

4. **Get Comments on Submission**
   ```sql
   SELECT * FROM api_comment WHERE submission_id = ? ORDER BY created_at;
   ```
   Uses: `idx_api_comment_submission_id`

---

## 🔧 Maintenance

### Regular Tasks:

1. **Daily:** Monitor database size
2. **Weekly:** Run VACUUM ANALYZE
3. **Monthly:** Check slow queries
4. **Quarterly:** Review and clean old data
5. **Yearly:** Update statistics, archive old submissions

---

## 📝 Notes

- All timestamps are in UTC
- Django ORM handles most operations
- Direct SQL useful for reporting and analytics
- S3 stores actual files, not database
- Database should contain <100 MB of data
- Backup recommended weekly

---

**Database schema optimized for SmartExam application! 🎓**
