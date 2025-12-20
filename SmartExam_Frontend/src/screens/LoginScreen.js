import React, { useState } from "react";
import {
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/axios";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1e",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  formContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64c8ff",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(100, 200, 255, 0.3)",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    height: 52,
  },
  inputContainerFocused: {
    borderColor: "rgba(100, 200, 255, 0.8)",
    backgroundColor: "rgba(100, 200, 255, 0.1)",
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    marginLeft: 12,
    fontWeight: "500",
  },
  buttonContainer: {
    gap: 12,
    marginTop: 32,
  },
  loginButton: {
    height: 52,
    borderRadius: 12,
    overflow: "hidden",
  },
  loginGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginLeft: 8,
  },
  registerButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "rgba(100, 200, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  registerButtonText: {
    color: "#64c8ff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    gap: 12,
  },
  loadingText: {
    color: "#64c8ff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter username and password");
      return;
    }

    setLoading(true);
    try {
      console.log("Attempting login with username:", username);
      const res = await api.post("login/", { username, password });
      console.log("Login successful");
      await AsyncStorage.setItem("accessToken", res.data.access);
      await AsyncStorage.setItem("refreshToken", res.data.refresh);
      if (res.data.role) {
        await AsyncStorage.setItem("userRole", res.data.role);
      }
      // Ensure we always store a username to avoid showing a stale name
      const storedName = res.data.username || username;
      if (storedName) {
        await AsyncStorage.setItem("userName", storedName);
      }

      // Try to fetch full profile after obtaining tokens. This ensures we
      // have an authoritative `userRole` from the backend even if the
      // login response did not include it.
      try {
        const profile = await api.get("profile/");
        if (profile?.data?.role) {
          await AsyncStorage.setItem("userRole", profile.data.role);
        }
        if (profile?.data?.username) {
          await AsyncStorage.setItem("userName", profile.data.username);
        }
      } catch (e) {
        // Non-fatal: if profile fetch fails it's probably because the
        // backend doesn't expose /api/profile/. We already saved fallback
        // values above so continue.
        console.warn("Profile fetch failed (optional):", e.message || e);
      }

      navigation.replace("Home");
    } catch (e) {
      console.error("Login error:", e.message);
      let errorMsg = "Login failed";
      if (e.response?.status === 401) {
        errorMsg = "Invalid username or password";
      }
      Alert.alert("Login Failed", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={["#64c8ff", "#1a4d7f"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoGradient}
          >
            <MaterialCommunityIcons name="brain" size={48} color="#fff" />
          </LinearGradient>
          <Text style={styles.title}>SmartExam</Text>
          <Text style={styles.subtitle}>Next Generation Exam Platform</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Username */}
          <Text style={styles.label}>Username</Text>
          <View
            style={[
              styles.inputContainer,
              usernameFocused && styles.inputContainerFocused,
            ]}
          >
            <MaterialCommunityIcons name="account" size={20} color="#64c8ff" />
            <TextInput
              placeholder="Enter your username"
              placeholderTextColor="#666"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              editable={!loading}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
            />
          </View>

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View
            style={[
              styles.inputContainer,
              passwordFocused && styles.inputContainerFocused,
            ]}
          >
            <MaterialCommunityIcons name="lock" size={20} color="#64c8ff" />
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#666"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              editable={!loading}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#64c8ff"
              />
            </TouchableOpacity>
          </View>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#64c8ff" />
            <Text style={styles.loadingText}>Logging in...</Text>
          </View>
        )}

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={login}
            disabled={loading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#64c8ff", "#1a7cff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.loginGradient}
            >
              <MaterialCommunityIcons name="login" size={20} color="#fff" />
              <Text style={styles.loginButtonText}>
                {loading ? "Logging in..." : "Login"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => {
              console.log("Register button pressed");
              navigation.navigate("Register");
            }}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.registerButtonText}>Create New Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
