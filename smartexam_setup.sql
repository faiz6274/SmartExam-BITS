-- SmartExam PostgreSQL Complete Setup Script
-- For AWS RDS PostgreSQL
-- Run this after Django migrations with: psql -h <RDS_HOST> -U postgresmart -d smartexam-mrp -f this_file.sql

-- ============================================
-- 1. CREATE INDEXES (for performance)
-- ============================================

CREATE INDEX IF NOT EXISTS idx_auth_user_username ON auth_user(username);
CREATE INDEX IF NOT EXISTS idx_auth_user_email ON auth_user(email);
CREATE INDEX IF NOT EXISTS idx_auth_user_role ON auth_user(role);

CREATE INDEX IF NOT EXISTS idx_api_exam_instructor_id ON api_exam(instructor_id);
CREATE INDEX IF NOT EXISTS idx_api_exam_is_published ON api_exam(is_published);

CREATE INDEX IF NOT EXISTS idx_api_question_exam_id ON api_question(exam_id);
CREATE INDEX IF NOT EXISTS idx_api_question_order ON api_question("order");

CREATE INDEX IF NOT EXISTS idx_api_submission_exam_id ON api_submission(exam_id);
CREATE INDEX IF NOT EXISTS idx_api_submission_student_id ON api_submission(student_id);
CREATE INDEX IF NOT EXISTS idx_api_submission_status ON api_submission(status);
CREATE INDEX IF NOT EXISTS idx_api_submission_submitted_at ON api_submission(submitted_at);

CREATE INDEX IF NOT EXISTS idx_api_submissionfile_submission_id ON api_submissionfile(submission_id);

CREATE INDEX IF NOT EXISTS idx_api_comment_submission_id ON api_comment(submission_id);
CREATE INDEX IF NOT EXISTS idx_api_comment_author_id ON api_comment(author_id);

-- ============================================
-- 2. SAMPLE DATA (Optional - for testing)
-- ============================================

-- Create test users (adjust password hashes as needed)
INSERT INTO auth_user (password, username, email, is_staff, is_superuser, is_active, role, date_joined) 
VALUES 
    ('pbkdf2_sha256$600000$abcdef1234567890$hash1', 'admin', 'admin@smartexam.local', true, true, true, 'admin', NOW()),
    ('pbkdf2_sha256$600000$abcdef1234567890$hash2', 'instructor1', 'instructor1@smartexam.local', false, false, true, 'instructor', NOW()),
    ('pbkdf2_sha256$600000$abcdef1234567890$hash3', 'irfan', 'irfan@smartexam.local', false, false, true, 'student', NOW()),
    ('pbkdf2_sha256$600000$abcdef1234567890$hash4', 'student1', 'student1@smartexam.local', false, false, true, 'student', NOW()),
    ('pbkdf2_sha256$600000$abcdef1234567890$hash5', 'student2', 'student2@smartexam.local', false, false, true, 'student', NOW())
ON CONFLICT (username) DO NOTHING;

-- ============================================
-- 3. CREATE VIEWS (for easy querying)
-- ============================================

-- View: All exams with instructor info and submission count
CREATE OR REPLACE VIEW v_exams_with_stats AS
SELECT 
    e.id,
    e.title,
    u.username as instructor,
    e.duration_minutes,
    e.is_published,
    e.created_at,
    COUNT(DISTINCT s.id) as total_submissions,
    COUNT(DISTINCT CASE WHEN s.status = 'graded' THEN s.id END) as graded_submissions
FROM api_exam e
JOIN auth_user u ON e.instructor_id = u.id
LEFT JOIN api_submission s ON e.id = s.exam_id
GROUP BY e.id, u.username;

-- View: Student submission status
CREATE OR REPLACE VIEW v_student_submissions AS
SELECT 
    s.id,
    u.username as student,
    e.title as exam,
    s.status,
    s.score,
    s.page_count,
    s.submitted_at,
    COUNT(f.id) as total_files,
    COUNT(c.id) as total_comments
FROM api_submission s
JOIN auth_user u ON s.student_id = u.id
JOIN api_exam e ON s.exam_id = e.id
LEFT JOIN api_submissionfile f ON s.id = f.submission_id
LEFT JOIN api_comment c ON s.id = c.submission_id
GROUP BY s.id, u.username, e.title;

-- View: Grade report
CREATE OR REPLACE VIEW v_grade_report AS
SELECT 
    u.username,
    e.title as exam,
    s.score,
    COALESCE(SUM(q.points), 0) as total_points,
    CASE 
        WHEN COALESCE(SUM(q.points), 0) > 0 
        THEN ROUND((s.score / SUM(q.points) * 100)::NUMERIC, 2)
        ELSE 0
    END as percentage,
    CASE 
        WHEN COALESCE(SUM(q.points), 0) > 0 AND (s.score / SUM(q.points)) >= e.passing_score 
        THEN 'PASS'
        ELSE 'FAIL'
    END as result,
    s.submitted_at
FROM api_submission s
JOIN auth_user u ON s.student_id = u.id
JOIN api_exam e ON s.exam_id = e.id
LEFT JOIN api_question q ON e.id = q.exam_id
WHERE s.status = 'graded'
GROUP BY s.id, u.username, e.title, e.passing_score;

-- ============================================
-- 4. STORED PROCEDURES (for common operations)
-- ============================================

-- Function: Get exam submission count
CREATE OR REPLACE FUNCTION get_exam_submission_count(exam_id INT)
RETURNS TABLE(
    total_submissions INT,
    submitted INT,
    graded INT
) AS $$
SELECT 
    COUNT(*)::INT as total_submissions,
    COUNT(CASE WHEN status = 'submitted' THEN 1 END)::INT as submitted,
    COUNT(CASE WHEN status = 'graded' THEN 1 END)::INT as graded
FROM api_submission
WHERE exam_id = exam_id;
$$ LANGUAGE SQL;

-- Function: Get student average score
CREATE OR REPLACE FUNCTION get_student_average_score(student_id INT)
RETURNS NUMERIC AS $$
SELECT ROUND(AVG(score)::NUMERIC, 2)
FROM api_submission
WHERE student_id = student_id AND status = 'graded' AND score IS NOT NULL;
$$ LANGUAGE SQL;

-- ============================================
-- 5. USEFUL QUERIES (copy and paste)
-- ============================================

-- Query 1: View all users and their roles
-- SELECT id, username, email, role, date_joined, is_active FROM auth_user ORDER BY role, date_joined DESC;

-- Query 2: View all exams
-- SELECT * FROM v_exams_with_stats ORDER BY created_at DESC;

-- Query 3: View all student submissions
-- SELECT * FROM v_student_submissions ORDER BY submitted_at DESC;

-- Query 4: View pending submissions
-- SELECT * FROM v_student_submissions WHERE status = 'submitted' ORDER BY submitted_at;

-- Query 5: View grades
-- SELECT * FROM v_grade_report ORDER BY exam, student;

-- Query 6: Get exam statistics
-- SELECT e.title, 
--        COUNT(s.id) as total,
--        AVG(s.score) as avg_score,
--        MIN(s.score) as min_score,
--        MAX(s.score) as max_score
-- FROM api_exam e
-- LEFT JOIN api_submission s ON e.id = s.exam_id AND s.status = 'graded'
-- GROUP BY e.id, e.title;

-- ============================================
-- 6. PERFORMANCE OPTIMIZATION
-- ============================================

-- Analyze all tables
ANALYZE;

-- Vacuum all tables
VACUUM;

-- ============================================
-- 7. DATABASE INFO
-- ============================================

-- Check table sizes
-- SELECT 
--     schemaname,
--     tablename,
--     pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
-- FROM pg_tables
-- WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
-- ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- ============================================
-- Setup Complete!
-- ============================================

-- The database is now ready for your SmartExam application
-- All indexes are created for optimal performance
-- Views are available for easy data querying
-- You can now run the Django application!
