@echo off
setlocal enabledelayedexpansion

REM Navigate to Android directory
cd /d "C:\Users\muham\Downloads\SmartExam-BITS\SmartExam_Frontend\android"

REM Build APK
echo Building Android APK...
call gradlew.bat assembleDebug

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================
    echo APK Build Successful!
    echo ============================================
    echo APK Location:
    echo C:\Users\muham\Downloads\SmartExam-BITS\SmartExam_Frontend\android\app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo You can now install this APK on an Android device or emulator
    echo.
) else (
    echo.
    echo Build failed with error code %ERRORLEVEL%
    echo.
)

pause
