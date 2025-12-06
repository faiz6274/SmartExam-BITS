# SmartExam Application - Setup & Testing Guide

## 🎯 Current Status

✅ **Backend:** Running at `http://localhost:8000/`
✅ **Frontend:** Expo app running
✅ **Database:** SQLite with test users
✅ **Instructor Panel:** Fully functional
✅ **Image Compression:** Implemented
✅ **Role-based Navigation:** Active

---

## 🔑 Test Credentials

### Student Login

```
Username: irfan
Password: Irfan123!
Role: Student
```

### Student Login (Alternative)

```
Username: student1
Password: Student123!
Role: Student
```

### Instructor Login

```
Username: instructor1
Password: Instructor123!
Role: Instructor
```

---

## 📱 Frontend Features

### Student Dashboard

After logging in as a student, you'll see:

1. **Scan & Submit** - Capture and submit exam documents

   - Take photos with camera
   - Adjust compression quality (50-100%)
   - Preview documents before submission
   - See compression stats (file size saved, compression percentage)

2. **My Submissions** - View submission history
   - See all your submitted exams
   - Track submission status (In Progress, Submitted, Graded)
   - View page count and submission dates

### Instructor Dashboard

After logging in as an instructor, you'll see:

1. **Instructor Panel** - Review student work
   - View all student submissions
   - Open submission modal to review
   - Navigate through submitted pages
   - View and add comments/feedback
   - See comment history with timestamps

---

## 🚀 Navigation

### Login Screen

- **Login Button:** Enter username and password, click "Login"
- **Register Button:** Click "Create New Account" to navigate to registration
  - Fill in username, email, password, and role
  - Click "Sign Up" to create account
  - Success popup will show
  - Returns to login screen

### Home Screen (After Login)

**For Students:**

- Scan & Submit card (blue)
- My Submissions card (green)

**For Instructors:**

- Instructor Panel card (purple)

---

## 🔧 Backend API Endpoints

### Authentication

- `POST /api/register/` - Register new user
- `POST /api/login/` - Login with JWT tokens

### Submissions

- `GET /api/submissions/` - List submissions
- `POST /api/submissions/` - Create submission
- `GET /api/submissions/{id}/` - Get submission details

### Comments

- `GET /api/comments/` - List comments
- `POST /api/comments/` - Add comment

### Exams

- `GET /api/exams/` - List exams
- `POST /api/exams/` - Create exam

---

## 📊 Database Users

All test users have been created in the SQLite database:

| Username    | Email                  | Role       | Password       |
| ----------- | ---------------------- | ---------- | -------------- |
| irfan       | irfan@example.com      | Student    | Irfan123!      |
| student1    | student@example.com    | Student    | Student123!    |
| instructor1 | instructor@example.com | Instructor | Instructor123! |

---

## 🐛 Troubleshooting

### Login fails with "401 Invalid username or password"

- ✅ Check that you're using EXACT password (case-sensitive)
- ✅ Verify username spelling
- ✅ Try a different test account

### Can't navigate to Register screen

- ✅ Make sure Login button is not disabled (not loading)
- ✅ Ensure network connection is active
- ✅ Reload the app if stuck

### Submissions not showing in Instructor Panel

- ✅ Verify you're logged in as instructor
- ✅ Check that student has actually submitted papers
- ✅ Try pulling down to refresh

### Image preview not showing

- ✅ Ensure file was uploaded correctly
- ✅ Check that image URL is accessible
- ✅ Try opening in browser directly

---

## 📝 Features Implemented

### Frontend (React Native/Expo)

- ✅ JWT-based authentication
- ✅ Role-based navigation (student/instructor)
- ✅ Document scanning with camera
- ✅ Image compression (quality slider, stats)
- ✅ Submission workflow
- ✅ Submission history tracking
- ✅ Instructor review panel
- ✅ File preview with pagination
- ✅ Comment system with timestamps
- ✅ Professional dark theme UI

### Backend (Django/DRF)

- ✅ User authentication with JWT
- ✅ Role-based permissions
- ✅ Submission management
- ✅ File upload handling
- ✅ Comment system
- ✅ Database optimizations
- ✅ CORS support for mobile
- ✅ Input validation
- ✅ Error handling

---

## 🎓 Testing Workflow

### Test As Student:

1. Login with `irfan` / `Irfan123!`
2. Click "Scan & Submit"
3. Take photos using camera (or select existing)
4. Adjust compression quality if needed
5. Click submit
6. Check "My Submissions" to verify

### Test As Instructor:

1. Login with `instructor1` / `Instructor123!`
2. Click "Instructor Panel"
3. See list of all student submissions
4. Click "Review" on a submission
5. View submitted files (use pagination)
6. Add comments and post feedback

---

## 📱 Platform Support

- ✅ Android (tested on emulator 10.0.2.2:8000)
- ✅ iOS (compatible)
- ⚠️ Web (partial support)

---

## 💾 Data Persistence

- **User data:** SQLite database (`db.sqlite3`)
- **Submission files:** FileSystem/Storage
- **Comments:** SQLite database
- **Auth tokens:** AsyncStorage (mobile)

---

## 🔐 Security Features

- JWT authentication with 30-min access token
- Role-based access control
- Password hashing (Django default)
- CSRF protection disabled for mobile
- Secure API endpoints
- Input validation on frontend and backend

---

## 📞 Support

If you encounter any issues:

1. Check the TEST_CREDENTIALS.md file
2. Verify backend is running: `python manage.py runserver --noreload 0.0.0.0:8000`
3. Check console logs in Expo
4. Verify database exists: `db.sqlite3`
5. Ensure all migrations are applied

---

**SmartExam is ready for testing! 🎉**
