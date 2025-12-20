@echo off
REM Quick APK checker script
REM Run this periodically to see if APK is ready

:check_apk
cls
echo ============================================
echo       SmartExam APK Build Status
echo ============================================
echo.
echo Checking for APK file...
echo.

if exist "c:\Users\muham\Downloads\SmartExam-BITS\SmartExam_Frontend\android\app\build\outputs\apk\debug\app-debug.apk" (
    echo [OK] APK Build COMPLETE!
    echo.
    echo File Location:
    echo c:\Users\muham\Downloads\SmartExam-BITS\SmartExam_Frontend\android\app\build\outputs\apk\debug\app-debug.apk
    echo.
    for /f "delims=" %%A in ('powershell -Command "(Get-Item 'c:\Users\muham\Downloads\SmartExam-BITS\SmartExam_Frontend\android\app\build\outputs\apk\debug\app-debug.apk').Length / 1MB"') do (
        echo File Size: %%A MB
    )
    echo.
    echo You can now:
    echo 1. Install on emulator: adb install -r app-debug.apk
    echo 2. Transfer to device and install manually
    echo 3. Share the APK file for distribution
    echo.
    pause
) else (
    echo [BUILDING] APK is still being compiled...
    echo.
    echo Please wait. This process can take 10-30 minutes.
    echo.
    echo.
    echo Re-run this script to check status again.
    echo.
    pause
    goto check_apk
)
