# Building APK from Expo App - Complete Guide

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Method 1: Expo Application Services (EAS) - Recommended](#method-1-expo-application-services-eas---recommended)
3. [Method 2: Local Build (Advanced)](#method-2-local-build-advanced)
4. [Testing the APK](#testing-the-apk)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

1. **Node.js & npm** (Already installed)

   ```powershell
   node --version  # Should be v18+
   npm --version   # Should be v9+
   ```

2. **Java Development Kit (JDK) 11+**

   ```powershell
   # Download from: https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html
   # Or use OpenJDK: https://adoptopenjdk.net/

   java -version  # Verify installation
   ```

3. **Android SDK** (if doing local build)

   - Install Android Studio from https://developer.android.com/studio
   - Or use command-line tools

4. **Expo CLI**
   ```powershell
   npm install -g expo-cli
   expo --version
   ```

---

## Method 1: Expo Application Services (EAS) - Recommended ⭐

### Why EAS is Better:

- ✅ No local Android environment needed
- ✅ Faster build times
- ✅ Cloud-based building
- ✅ Automatic code signing
- ✅ Supports iOS and Android

### Step 1: Create Expo Account

1. Go to https://expo.dev
2. Click "Sign up"
3. Create account with email and password
4. Verify email

### Step 2: Install EAS CLI

```powershell
npm install -g eas-cli
eas --version
```

### Step 3: Login to Expo

```powershell
cd c:\Users\muham\Downloads\SmartExam-BITS\SmartExam_Frontend

eas login
# Enter your Expo email
# Enter your Expo password
```

Expected output:

```
✓ Logged in as: your-email@example.com
```

### Step 4: Initialize EAS Project

```powershell
eas build:configure
```

Select:

- Platform: **Android** (or choose both for iOS+Android)
- Accept default settings

This creates `eas.json` file.

### Step 5: Configure app.json

Open `c:\Users\muham\Downloads\SmartExam-BITS\SmartExam_Frontend\app.json`

Update or verify:

```json
{
  "expo": {
    "name": "SmartExam",
    "slug": "smartexam",
    "version": "1.0.0",
    "assetBundlePatterns": ["**/*"],
    "plugins": [],
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.smartexam.app"
    }
  }
}
```

**Important:** Set unique `package` (e.g., `com.yourname.smartexam`)

### Step 6: Create App Icons (Optional but Recommended)

For production, create icons:

- Size: 1024x1024 pixels
- Format: PNG
- Save as: `assets/icon.png`

You can use:

- https://www.canva.com/create/logos/
- https://favicon.io/
- Adobe Express

### Step 7: Build APK

```powershell
cd c:\Users\muham\Downloads\SmartExam-BITS\SmartExam_Frontend

# Build for Android
eas build --platform android --local

# Or use Expo's cloud build (recommended for first time)
eas build --platform android
```

**First-time setup will ask:**

- Store credentials? → **Yes**
- Create keystore? → **Yes**

Expected output:

```
Build submitted successfully
📦 Builds
  eas build -p android -s <BUILD_ID>
  eas build --status

Build details can be viewed at:
https://expo.dev/builds/<BUILD_ID>
```

### Step 8: Download APK

**Option A: Via Web Dashboard**

1. Go to https://expo.dev/builds
2. Click on your build
3. Click "Download" when build is complete (5-15 minutes)
4. Save as `SmartExam.apk`

**Option B: Via CLI**

```powershell
# Check build status
eas build --status

# When complete, copy the download link from the output
# Or use:
eas build:view
```

### Step 9: Transfer APK to Device

#### Method A: USB Cable

```powershell
# Connect Android device with USB cable

# Enable USB Debugging on phone:
# Settings → Developer Options → USB Debugging → ON

# Copy APK
adb push SmartExam.apk /sdcard/Download/

# Install
adb install SmartExam.apk
```

#### Method B: Email or Cloud

1. Download APK on your computer
2. Email to yourself
3. Open email on phone
4. Tap APK to install

#### Method C: Google Drive

1. Upload APK to Google Drive
2. Share link
3. Open on phone → Download → Install

---

## Method 2: Local Build (Advanced)

### Requirements:

- Android SDK installed
- JAVA_HOME environment variable set
- 30+ GB disk space

### Step 1: Install Expo Build Tools

```powershell
npm install -g @react-native-community/cli

# Or use EAS locally (requires credentials)
eas build --local --platform android
```

### Step 2: Build Command

```powershell
cd SmartExam_Frontend

# This builds an APK
eas build --platform android --local
```

### Step 3: Find Generated APK

```powershell
# APK location (varies by setup)
# Usually: SmartExam_Frontend/dist/ or build/

# Look for: SmartExam-*.apk
```

---

## Testing the APK

### Prerequisites:

- Android phone or emulator
- USB cable (for phone)

### On Physical Device

#### Step 1: Enable USB Debugging

1. Go to phone **Settings**
2. Find **About Phone** (scroll down)
3. Tap **Build Number** 7 times (until "Developer mode enabled")
4. Go back to **Settings** → **Developer Options**
5. Enable **USB Debugging**

#### Step 2: Connect Phone

```powershell
# Connect phone with USB cable

# List connected devices
adb devices

# Should see: device_id   device
```

#### Step 3: Install APK

```powershell
adb install SmartExam.apk

# Output:
# Success
# Performing Streamed Install
```

#### Step 4: Launch App

```powershell
# Or tap the app icon on your phone

adb shell am start -n com.smartexam.app/com.smartexam.app.MainActivity
```

### On Android Emulator

#### Step 1: Open Emulator

```powershell
# List available emulators
emulator -list-avds

# Start emulator (e.g., Pixel_4)
emulator -avd Pixel_4
```

#### Step 2: Install APK

```powershell
adb install SmartExam.apk
```

#### Step 3: Launch App

```powershell
adb shell am start -n com.smartexam.app/com.smartexam.app.MainActivity
```

---

## Optimizing APK Size

### Current Size Issues:

React Native apps are typically 50-150 MB. To reduce:

#### 1. Enable ProGuard Minification

Update `app.json`:

```json
{
  "expo": {
    "android": {
      "enableProguardObfuscationForReleaseBuilds": true
    }
  }
}
```

#### 2. Remove Unused Assets

```bash
# Check node_modules for unused packages
npm list
npm prune

# Remove unused fonts, images from assets/
```

#### 3. Split APK by Architecture

Update `app.json`:

```json
{
  "expo": {
    "android": {
      "enableProguardObfuscationForReleaseBuilds": true,
      "enableShrinkResourcesForReleaseBuilds": true
    }
  }
}
```

#### 4. Use App Bundle (Recommended)

```powershell
eas build --platform android --app-bundle
```

Produces `.aab` file instead of `.apk` (smaller, Google Play prefers this)

---

## Signing APK for Google Play

### Prerequisites:

- Google Play Developer Account ($25 one-time fee)

### Step 1: Create Keystore

```powershell
keytool -genkey -v -keystore my-release-key.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias my-key-alias \
  -storepass password123 \
  -keypass password123 \
  -dname "CN=Muhammad, OU=SmartExam, O=Company, L=City, S=State, C=IN"
```

### Step 2: Configure app.json

```json
{
  "expo": {
    "android": {
      "buildType": "release",
      "permissions": [
        "android.permission.CAMERA",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.INTERNET"
      ]
    }
  }
}
```

### Step 3: Use EAS for Signing

```powershell
eas build --platform android --type release
```

EAS handles signing automatically for you!

---

## Upload to Google Play Store

### Step 1: Create Google Play Account

1. Go to https://play.google.com/console/
2. Click "Create account"
3. Pay $25 developer fee
4. Complete setup

### Step 2: Create App Listing

1. Click "Create app"
2. Fill in app details:
   - App name: SmartExam
   - App category: Education
   - Description: Exam submission system with document scanning

### Step 3: Upload APK/AAB

1. Go to "Release" section
2. Click "Create new release"
3. Upload APK or App Bundle
4. Fill in release notes

### Step 4: Submit for Review

1. Fill in store listing details
2. Add screenshots (minimum 2)
3. Set app rating
4. Submit for review

Approval usually takes 2-4 hours.

---

## APK Build Troubleshooting

### Error: "eas login" not working

```powershell
# Clear credentials
eas logout

# Login again
eas login
```

### Error: "Cannot find Java"

```powershell
# Set JAVA_HOME
$env:JAVA_HOME = "C:\Program Files\Java\jdk-11.0.15"

# Verify
$env:JAVA_HOME
```

### Error: "Build failed: Out of memory"

```powershell
# Increase heap size
$env:NODE_OPTIONS = "-Xmx4096m"

# Retry build
eas build --platform android
```

### Error: "Invalid package name"

In `app.json`, update package to valid format:

```json
"android": {
  "package": "com.yourcompany.smartexam"
}
```

### Build Stuck / Taking Too Long

```powershell
# Check build status
eas build --status

# View logs
eas build:view

# Cancel if needed
eas build --cancel <BUILD_ID>
```

### APK Won't Install

```powershell
# Clear app data
adb shell pm clear com.smartexam.app

# Uninstall completely
adb uninstall com.smartexam.app

# Reinstall
adb install SmartExam.apk
```

---

## Quick Reference Commands

| Task               | Command                                |
| ------------------ | -------------------------------------- |
| Login to Expo      | `eas login`                            |
| Configure EAS      | `eas build:configure`                  |
| Build APK (cloud)  | `eas build --platform android`         |
| Build APK (local)  | `eas build --platform android --local` |
| Check build status | `eas build --status`                   |
| List devices       | `adb devices`                          |
| Install APK        | `adb install SmartExam.apk`            |
| View app logs      | `adb logcat`                           |
| Uninstall app      | `adb uninstall com.smartexam.app`      |

---

## Recommended Steps (TL;DR)

1. **Create Expo account** at https://expo.dev
2. **Install EAS CLI:**
   ```powershell
   npm install -g eas-cli
   ```
3. **Login:**
   ```powershell
   eas login
   ```
4. **Configure:**
   ```powershell
   cd SmartExam_Frontend
   eas build:configure
   ```
5. **Build APK:**
   ```powershell
   eas build --platform android
   ```
6. **Download** from https://expo.dev/builds
7. **Install on phone:**
   ```powershell
   adb install SmartExam.apk
   ```

---

## Performance Checklist Before Release

- [ ] Update app version in `app.json`
- [ ] Add app icon (1024x1024 PNG)
- [ ] Test on multiple devices
- [ ] Check image compression is working
- [ ] Verify AWS backend connectivity
- [ ] Test login with multiple users
- [ ] Check file uploads work
- [ ] Test camera permissions
- [ ] Verify storage permissions
- [ ] Test on slow network
- [ ] Build in release mode (not debug)

---

**Ready to build? Start with Method 1 (EAS) - it's the easiest! 🚀**
