# SmartExam Startup Guide

## Backend Setup

1. Open PowerShell in `SmartExam_Backend` folder
2. Run the server:

```powershell
cd C:\Users\muham\Downloads\SmartExam-BITS\SmartExam_Backend
cmd /c "venv\Scripts\python.exe run_server2.py"
```

3. You should see:

```
Django version 4.2, using settings 'backend.settings'
Starting development server at http://0.0.0.0:8000/
```

## Frontend Setup

1. Open **NEW** PowerShell/Terminal window
2. Go to frontend folder:

```powershell
cd C:\Users\muham\Downloads\SmartExam-BITS\SmartExam_Frontend
```

3. **IMPORTANT**: Clear cache and restart Expo:

```powershell
npm start -- --clear
```

4. In the Expo terminal, press `a` for Android emulator

5. **Wait 2-3 minutes** for the app to bundle and load

## What to expect

- First: Blank screen with loading bar (Metro is bundling)
- Then: Login screen appears
- Try: Username: testuser, Password: testpass123
  - OR register a new account first

## If stuck on blank screen

Press `r` in the Expo terminal to reload
Press `Ctrl+C` and try again with `npm start -- --clear`
