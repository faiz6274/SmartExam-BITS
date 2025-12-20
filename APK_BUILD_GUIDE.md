# SmartExam APK Build Guide

## Build Status

Your Android APK is currently being built using Gradle. This is a one-time process that downloads dependencies and compiles the native code.

## Timeline

- **Step 1**: ✅ Downloaded Gradle 7.5.1
- **Step 2**: ✅ Started Gradle Daemon
- **Step 3**: 🔄 Currently initializing and compiling React Native settings
- **Step 4**: ⏳ Will compile Java code
- **Step 5**: ⏳ Will build APK from compiled code
- **Step 6**: ⏳ APK will be output to:
  ```
  SmartExam_Frontend/android/app/build/outputs/apk/debug/app-debug.apk
  ```

## Expected Build Time

- **First build**: 15-30 minutes (downloading dependencies)
- **Subsequent builds**: 5-10 minutes (cached dependencies)

## What's Happening

The Gradle build process is:

1. Setting up the React Native Android build environment
2. Compiling TypeScript/JavaScript to native code
3. Linking native modules
4. Packaging assets (images, fonts, JSON)
5. Creating signed debug APK

## After Build Completes

### Option A: Install on Emulator

```bash
adb install -r "c:\Users\muham\Downloads\SmartExam-BITS\SmartExam_Frontend\android\app\build\outputs\apk\debug\app-debug.apk"
```

### Option B: Install on Physical Device

1. Enable Developer Mode on Android device
2. Connect USB cable with file transfer enabled
3. Run same `adb install` command above
4. Or transfer APK file directly and tap to install

### Option C: Share APK

The APK file can be shared directly with:

- QR code scanning (from file server)
- Email/cloud storage
- Device to device transfer

## Configuration Applied

- ✅ Frontend API_BASE: `http://ec2-13-200-180-132.ap-south-1.compute.amazonaws.com:8000/api/`
- ✅ AWS RDS Database: `smartexam.cbw2iqs8ejf6.ap-south-1.rds.amazonaws.com`
- ✅ AWS S3 Bucket: `smart-exam-mrp` (ap-south-1)
- ✅ Backend CORS: Configured to accept requests

## APK Details

- **Type**: Debug APK (suitable for testing, development)
- **Size**: Approximately 150-200MB (depending on dependencies)
- **Minimum Android**: API Level 21 (Android 5.0+)
- **Architecture**: All supported (ARM64, ARM32, x86, x86_64)

## If Build Fails

1. Check internet connection (dependencies are downloaded)
2. Ensure 5GB+ free disk space
3. Java Development Kit (JDK) 11 or higher is installed
4. Check for file permission issues

## Next Steps

Once build completes:

1. ✅ Check for `app-debug.apk` file
2. ✅ Install on emulator/device using ADB
3. ✅ Test full exam workflow:
   - Instructor creates exam
   - Student scans documents
   - Student selects exam
   - Student submits papers to AWS S3
   - Instructor reviews submissions

---

**Note**: Keep this terminal open until build completes. The build will show "BUILD SUCCESSFUL" when done.
