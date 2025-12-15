# EAS APK Build - Next Steps

## ✅ Prerequisites Verified

- ✅ Node.js v24.11.1
- ✅ npm v11.6.2
- ✅ EAS CLI v16.28.0 installed
- ✅ app.json configured
- ✅ eas.json configured
- ✅ All dependencies in place

## 🚀 Next Steps

### Step 1: Login to Expo (One-time setup)

```powershell
cd c:\Users\muham\Downloads\SmartExam-BITS\SmartExam_Frontend
eas login
```

**You'll be asked:**

- Email: (use your Expo account email)
- Password: (your Expo password)

**If you don't have an Expo account:**

1. Go to https://expo.dev
2. Click "Sign up"
3. Create account with email/password
4. Verify your email
5. Then run `eas login`

### Step 2: Build APK

Once logged in, run:

```powershell
eas build --platform android
```

**The build will:**

1. Create a keystore for signing (first time only)
2. Store credentials securely
3. Upload code to Expo servers
4. Build APK in the cloud (5-15 minutes)
5. Store build in Expo dashboard

**Expected output:**

```
✓ Logged in as: your-email@example.com
Build submitted successfully
Build ID: ...
View build details: https://expo.dev/builds/...
```

### Step 3: Download APK

**Option A: From Dashboard (Recommended)**

1. Go to https://expo.dev/builds
2. Find your build (status shows "finished")
3. Click "Download" to get SmartExam.apk

**Option B: Via Terminal**

```powershell
eas build --status
```

### Step 4: Install on Phone

```powershell
# Connect phone via USB with Developer Mode enabled
adb install SmartExam.apk

# Or manually:
# 1. Email APK to yourself
# 2. Download on phone
# 3. Tap to install
```

---

## 📋 Current Configuration

### app.json Settings:

- App Name: **SmartExam**
- Package: **com.smartexam.app**
- Version: **1.0.0**
- Platform: **Android**

### Build Type:

- **preview**: Builds APK (good for testing)
- **production**: Optimized APK (good for Google Play)

To build preview APK:

```powershell
eas build --platform android --profile preview
```

To build production APK:

```powershell
eas build --platform android --profile production
```

---

## ⚠️ First-Time Setup

When you run `eas build --platform android` for the first time:

1. **Keystore Creation:**

   - EAS will ask: "Create a new keystore?"
   - Answer: **Yes**
   - EAS automatically handles signing

2. **Credentials Storage:**

   - EAS will ask: "Store credentials?"
   - Answer: **Yes**
   - Safe storage on Expo servers

3. **Build Options:**
   - Choose **Android** (or both iOS/Android)
   - Select **APK** format

---

## 🔗 Useful Links

- **Expo Dashboard:** https://expo.dev
- **Build Status:** https://expo.dev/builds
- **EAS Documentation:** https://docs.expo.dev/build/introduction/
- **Project Slug:** smartexam

---

## ✨ Pro Tips

1. **Faster Rebuilds:**
   After first build, subsequent builds are cached and faster

2. **Update Version:**
   Before rebuilding, update `app.json`:

   ```json
   "version": "1.0.1"
   ```

3. **Check Build Status:**

   ```powershell
   eas build --status
   ```

4. **View Build Logs:**

   ```powershell
   eas build:view
   ```

5. **Cancel Build:**
   ```powershell
   eas build --cancel <BUILD_ID>
   ```

---

## 🎯 Ready? Start Here:

```powershell
# 1. Navigate to frontend
cd c:\Users\muham\Downloads\SmartExam-BITS\SmartExam_Frontend

# 2. Login
eas login

# 3. Build
eas build --platform android

# 4. Wait for build to complete
# 5. Download APK
# 6. Install on phone
```

**You're all set! Follow these steps and you'll have an APK in 5-15 minutes! 🚀**
