
// src/screens/RegisterScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import api from "../api/axios"; // adjust if your path differs

export default function RegisterScreen({ navigation }) {
  // ----- Form state -----
  const [role, setRole] = useState("student"); // "student" | "instructor"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ----- UI state -----
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // ----- Client-side validations (matching your on-screen tips) -----
  const validateInputs = () => {
    const newErrors = {};

    // Username
    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (username.length > 30) {
      newErrors.username = "Username must be at most 30 characters";
    } else if (!/^[A-Za-z0-9_]+$/.test(username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores";
    }

    // Email
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least one number";
    } else if (!/[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/]/.test(password)) {
      newErrors.password = "Password must contain at least one special character";
    }

    // Confirm Password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Map backend errors (DRF serializer) to an Alert message
  const buildErrorMessage = (data) => {
    if (!data || typeof data !== "object") return "Registration failed. Please try again.";

    if (data.email && Array.isArray(data.email)) {
      return `Email: ${data.email[0]}`;
    } else if (data.username && Array.isArray(data.username)) {
      return `Username: ${data.username[0]}`;
    } else if (data.password && Array.isArray(data.password)) {
      return `Password: ${data.password[0]}`;
    } else if (data.confirmPassword && Array.isArray(data.confirmPassword)) {
      return `Confirm Password: ${data.confirmPassword[0]}`;
    } else if (data.role) {
      return String(data.role);
    } else if (data.detail) {
      return String(data.detail);
    } else {
      const keys = Object.keys(data);
      if (keys.length > 0) {
        const k = keys[0];
        const v = Array.isArray(data[k]) ? data[k][0] : data[k];
        return `${k}: ${v}`;
      }
    }
    return "Registration failed. Please try again.";
  };

  // ----- Submit handler (uses axios baseURL + "register/") -----

const register = async () => {
  // Client-side validations you already have
  if (!validateInputs()) {
    Alert.alert("Validation Error", "Please fix the errors below");
    return;
  }

  setLoading(true);

  // Build payload EXACTLY as backend expects
  const payload = {
    username: username.trim(),
    email: email.trim(),
    password,
    confirmPassword,      // must be non-empty and match password
    role,                 // "student" | "instructor"
    // first_name, last_name if you add them later
  };

  // Helpful debug
  console.log("REGISTER PAYLOAD:", payload);
  console.log("API Base URL:", api.defaults.baseURL);

  try {
    // IMPORTANT
    //  - baseURL in src/axios.js must end with /api/
    //  - endpoint path here must be relative and include a trailing slash
    //    e.g., "register/"
    const res = await api.post("register/", payload);

    console.log("REGISTER STATUS:", res.status);
    console.log("REGISTER RESPONSE:", res.data);

    if (res.status === 201) {
      // ✅ Only show success when backend actually created the user
      Alert.alert(
        "Account Created Successfully",
        `Welcome to SmartExam, ${username}!\n\nYour account has been created as a ${role}.\n\nPlease login with your credentials.`,
        [{ text: "Login Now", onPress: () => navigation.goBack(), style: "default" }],
        { cancelable: false }
      );
    } else {
      // very rare non-201 case
      Alert.alert("Registration Failed", "Unexpected response from server.");
    }
  } catch (e) {
    const status = e?.response?.status;
    const data = e?.response?.data;
    console.log("Registration error:", e?.message, "status:", status, "data:", data);

    // Map DRF serializer errors to a readable message
    let msg = "Registration failed. Please try again.";
    if (data) {
      if (data.email && Array.isArray(data.email)) msg = `Email: ${data.email[0]}`;
      else if (data.username && Array.isArray(data.username)) msg = `Username: ${data.username[0]}`;
      else if (data.password && Array.isArray(data.password)) msg = `Password: ${data.password[0]}`;
      else if (data.confirmPassword && Array.isArray(data.confirmPassword)) msg = `Confirm Password: ${data.confirmPassword[0]}`;
      else if (data.role) msg = String(data.role);
      else if (data.detail) msg = String(data.detail);
      else {
        const k = Object.keys(data)[0];
        const v = Array.isArray(data[k]) ? data[k][0] : data[k];
        msg = `${k}: ${v}`;
      }
    } else if (e?.message) {
      msg = e.message;
    }

    Alert.alert("Registration Failed", msg);

    // Push the backend field errors under your inputs for UX
    setErrors((prev) => ({
      ...prev,
      username: Array.isArray(data?.username) ? data.username[0] : prev.username,
      email: Array.isArray(data?.email) ? data.email[0] : prev.email,
      password: Array.isArray(data?.password) ? data.password[0] : prev.password,
      confirmPassword: Array.isArray(data?.confirmPassword) ? data.confirmPassword[0] : prev.confirmPassword,
    }));
  } finally {
    setLoading(false);
  }
};


  // ----- UI -----
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoid}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.scrollContent}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the next generation of smart exams</Text>

          {/* Password requirements */}
          <View style={styles.validationInfo}>
            <Text style={styles.validationInfoText}>
              <Text style={{ fontWeight: "700", color: "#64c8ff" }}>Password requirements:</Text>
              {"\n"}• At least 8 characters
              {"\n"}• One uppercase letter
              {"\n"}• One number
              {"\n"}• One special character (!@#$%^&*)
            </Text>
          </View>

          {/* Role selection */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Choose Your Role</Text>
            <View style={styles.roleContainer}>
              <TouchableOpacity
                style={[styles.roleButton, role === "student" && styles.roleButtonActive]}
                onPress={() => setRole("student")}
                disabled={loading}
                activeOpacity={0.8}
              >
                <Text style={[styles.roleButtonText, role === "student" && styles.roleButtonTextActive]}>
                  🎓 Student
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.roleButton, role === "instructor" && styles.roleButtonActive]}
                onPress={() => setRole("instructor")}
                disabled={loading}
                activeOpacity={0.8}
              >
                <Text style={[styles.roleButtonText, role === "instructor" && styles.roleButtonTextActive]}>
                  👨‍🏫 Instructor
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Username */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              placeholder="3-30 characters, letters/numbers/_"
              placeholderTextColor="#555"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                if (errors.username) setErrors({ ...errors, username: "" });
              }}
              style={[styles.input, errors.username && styles.inputError]}
              editable={!loading}
            />
            {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
          </View>

          {/* Email */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              placeholder="your@email.com"
              placeholderTextColor="#555"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              keyboardType="email-address"
              style={[styles.input, errors.email && styles.inputError]}
              editable={!loading}
              autoCapitalize="none"
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          {/* Password */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={[styles.passwordContainer, errors.password && styles.passwordContainerError]}>
              <TextInput
                placeholder="Enter password"
                placeholderTextColor="#555"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
                style={styles.passwordInput}
                editable={!loading}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.visibilityIcon}
                onPress={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                <MaterialCommunityIcons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#64c8ff"
                />
              </TouchableOpacity>
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          </View>

          {/* Confirm Password */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <View
              style={[styles.passwordContainer, errors.confirmPassword && styles.passwordContainerError]}
            >
              <TextInput
                placeholder="Re-enter password"
                placeholderTextColor="#555"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
                }}
                style={styles.passwordInput}
                editable={!loading}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.visibilityIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
              >
                <MaterialCommunityIcons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#64c8ff"
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={register}
              disabled={loading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#64c8ff", "#1a7cff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.registerGradient}
              >
                <MaterialCommunityIcons name="account-plus" size={20} color="#fff" />
                <Text style={styles.registerButtonText}>
                  {loading ? "Creating..." : "Create Account"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.backButtonText}>Back to Login</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* ===== Styles (kept to match your UI/UX) ===== */
const styles = StyleSheet.create({
  keyboardAvoid: { flex: 1 },
  container: { flex: 1, backgroundColor: "#0a0f1e" },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 24 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 8, textAlign: "center", color: "#fff" },
  subtitle: { fontSize: 13, color: "#9099", textAlign: "center", marginBottom: 24, letterSpacing: 0.5 },

  fieldContainer: { marginBottom: 16 },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64c8ff",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  input: {
    padding: 14,
    borderWidth: 1.5,
    borderColor: "rgba(100, 200, 255, 0.3)",
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
  inputError: {
    borderColor: "rgba(255, 107, 107, 0.8)",
    backgroundColor: "rgba(255, 107, 107, 0.1)",
  },
  errorText: { color: "#ff6b6b", fontSize: 11, marginTop: 6, fontWeight: "600" },

  // Role selection
  roleContainer: { flexDirection: "row", gap: 12, marginBottom: 16 },
  roleButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: "rgba(100, 200, 255, 0.3)",
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  roleButtonActive: {
    borderColor: "#64c8ff",
    backgroundColor: "rgba(100, 200, 255, 0.15)",
  },
  roleButtonText: { color: "#fff", fontSize: 14, fontWeight: "700", letterSpacing: 0.5 },
  roleButtonTextActive: { color: "#64c8ff" },

  // Password fields
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(100, 200, 255, 0.3)",
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 12,
  },
  passwordContainerError: {
    borderColor: "rgba(255, 107, 107, 0.8)",
    backgroundColor: "rgba(255, 107, 107, 0.1)",
  },
  passwordInput: { flex: 1, padding: 14, fontSize: 14, color: "#fff", fontWeight: "500" },
  visibilityIcon: { padding: 8 },

  // Buttons
  buttonContainer: { marginTop: 32, gap: 12 },
  registerButton: {
    height: 52,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#64c8ff",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  registerGradient: { flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" },
  registerButtonText: { color: "#fff", fontSize: 16, fontWeight: "700", letterSpacing: 0.5, marginLeft: 8 },

  backButton: {
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(100, 200, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  backButtonText: { color: "#64c8ff", fontSize: 14, fontWeight: "700", letterSpacing: 0.5 },

  // Info panel
  validationInfo: {
    backgroundColor: "rgba(100, 200, 255, 0.1)",
    borderLeftWidth: 3,
    borderLeftColor: "#64c8ff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  validationInfoText: { fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 20, fontWeight: "500" },
});
