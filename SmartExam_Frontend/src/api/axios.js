import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import Constants from "expo-constants";

// Determine API base from Expo config `extra.API_BASE` when available.
// Fallback to local defaults for development when not provided.
const expoExtra = Constants?.expoConfig?.extra || {};
console.log("expoExtra:", expoExtra);
console.log("expoExtra.API_BASE:", expoExtra.API_BASE);

let API_BASE = expoExtra.API_BASE;

if (!API_BASE) {
  // Local defaults
  if (Platform.OS === "android") {
    API_BASE = "http://10.0.2.2:8000/api/"; // Android emulator -> host machine
  } else if (Platform.OS === "ios") {
    API_BASE = "http://localhost:8000/api/";
  } else {
    API_BASE = "http://localhost:8000/api/";
  }
}

const USE_LOCAL_BACKEND = !expoExtra.API_BASE; // True if using local defaults, false if from expo config

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // Don't require CSRF token for mobile app
  xsrfCookieName: "", // Disable CSRF cookie
  xsrfHeaderName: "", // Disable CSRF header
});

console.log("═══════════════════════════════════════");
console.log("[API Configuration]");
console.log(`Backend: ${USE_LOCAL_BACKEND ? "LOCAL" : "AWS PRODUCTION"}`);
console.log(`API Base URL: ${API_BASE}`);
console.log(`Platform: ${Platform.OS}`);
console.log("═══════════════════════════════════════");

// Attach access token to every request (except public endpoints)
api.interceptors.request.use(async (config) => {
  // Don't attach token to public endpoints
  const publicEndpoints = ["register/", "login/", "token/"];
  const isPublicEndpoint = publicEndpoints.some((endpoint) =>
    config.url.includes(endpoint)
  );

  if (!isPublicEndpoint) {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("API Request:", config.url);
  return config;
});

// Log errors for debugging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error Details:", {
      message: error.message,
      code: error.code,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      status: error.response?.status,
      statusText: error.response?.statusText,
      responseData: error.response?.data,
      errno: error.errno,
    });
    return Promise.reject(error);
  }
);

export default api;

// Test connectivity
export const testConnection = async () => {
  try {
    console.log("Testing connection to:", API_BASE);
    const res = await api.get("");
    console.log("Connection successful:", res.data);
    return true;
  } catch (e) {
    console.error("Connection failed:", e.message);
    return false;
  }
};
