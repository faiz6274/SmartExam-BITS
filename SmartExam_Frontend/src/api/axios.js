
// src/axios.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

/**
 * Toggle this to route API calls:
 *  - true  => Production (EC2)
 *  - false => Local development (emulator/simulator)
 */
const USE_PROD = true;

/** ====== Base URLs (WITH trailing slash) ====== */
// EC2 public IP (HTTP as requested) — trailing slash is IMPORTANT
const PROD_API_BASE = "http://13.200.180.132/api/";

// Local development — trailing slash as well
const LOCAL_API_BASE_ANDROID = "http://10.0.2.2:8000/api/";
const LOCAL_API_BASE_IOS = "http://localhost:8000/api/";

// Ensure trailing slash defensively
const ensureTrailingSlash = (u) => (u.endsWith("/") ? u : u + "/");

/** Resolve API base depending on platform/toggle */
let API_BASE;
if (USE_PROD) {
  API_BASE = ensureTrailingSlash(PROD_API_BASE);
} else {
  API_BASE = ensureTrailingSlash(
    Platform.OS === "android" ? LOCAL_API_BASE_ANDROID : LOCAL_API_BASE_IOS
  );
}

/** ====== Axios instance ====== */
const api = axios.create({
  baseURL: API_BASE,              // e.g., http://13.200.180.132/api/
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // CSRF not needed for token-based API
  xsrfCookieName: "",
  xsrfHeaderName: "",
});

// Helpful startup log
console.log("API Base URL:", api.defaults.baseURL);

/** ====== Public endpoints (exact path names) ====== */
/**
 * Use relative paths WITHOUT leading slash so Axios appends to baseURL correctly.
 * Examples:
 *   api.post("register/") => http://13.200.180.132/api/register/
 */
const PUBLIC_ENDPOINTS = new Set([
  "register",
  "register/",
  "login",
  "login/",
  "token",
  "token/",
  "health",
  "health/",
  "csrf",
  "csrf/",
]);

/** ====== Request interceptor (attach JWT) ====== */
api.interceptors.request.use(async (config) => {
  // Normalize any accidental leading slash
  if (config.url?.startsWith("/")) {
    config.url = config.url.slice(1);
  }

  // Normalize to compare without trailing slash
  const urlPath = String(config.url || "");
  const normalized = urlPath.endsWith("/") ? urlPath : `${urlPath}/`;
  const isPublic = PUBLIC_ENDPOINTS.has(normalized);

  if (!isPublic) {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // Non-fatal: continue without token
      console.warn("AsyncStorage token read failed:", e?.message || e);
    }
  }

  return config;
});

/** ====== Response interceptor (centralized debug) ====== */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Helpful error log
    console.log("API Error Details:", {
      message: error.message,
      code: error.code,
      method: error.config?.method,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      status: error.response?.status,
      statusText: error.response?.statusText,
      responseData: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export default api;

/** ====== Connectivity test ====== */
export const testConnection = async () => {
  try {
    // Call a simple health endpoint if available
    const res = await api.get("health/"); // resolves to http://.../api/health/
    console.log("Connection OK:", res.data);
    return true;
  } catch (e) {
    console.error("Connection failed:", e.message);
    return false;
  }
};
