import axios from "axios";
import { config } from "../utils/config";
import { storageKeys } from "../constants/constants";
import { getLocalStorageData, removeLocalStorageData } from "../utils/helper";
// import { clearToken } from './tokenService';
const apiPrefix: string = "/api/admin";
const api = axios.create({
  baseURL: `${config.BACKEND_API_URL}${apiPrefix}`,
  timeout: 60000,
});

let isLoggingOut = false;

// ======================
// LOGOUT HELPER
// ======================
const logoutUser = async () => {
  if (isLoggingOut) return;

  try {
    isLoggingOut = true;

    removeLocalStorageData(storageKeys.authStorage);
        // removeLocalStorageData(storageKeys.fcmToken);
    console.log("Session expired. Redirect to login.");
  } catch (error) {
    console.log("Logout Error:", error);
  } finally {
    isLoggingOut = false;
  }
};

// ======================
// REQUEST INTERCEPTOR
// ======================
api.interceptors.request.use(
  async (config) => {
    const token = getLocalStorageData(storageKeys.authStorage)?.state?.token;
    console.log("auth-token", token)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Check if request body is FormData
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ======================
// RESPONSE INTERCEPTOR
// ======================
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("error", error.response);

     // ======================
    // NETWORK ERROR
    // ======================
    if (!error.response) {
      return Promise.reject({
        success: false,
        message:
          "Unable to connect to server. Please check your internet connection.",
      });
    }

    // ======================
    // TIMEOUT ERROR
    // ======================
    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        success: false,
        message:
          "Request timeout. Please try again.",
      });
    }

    const status = error.response.status;

    // ======================
    // UNAUTHORIZED
    // ======================
    if (status === 401) {
      console.log("Session expired.");

      await logoutUser();

      return Promise.reject({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    // ======================
    // FORBIDDEN
    // ======================
    if (status === 403) {
      return Promise.reject({
        success: false,
        message:
          "You do not have permission to perform this action.",
      });
    }

    // ======================
    // SERVER ERROR
    // ======================
    if (status >= 500) {
      return Promise.reject({
        success: false,
        message:
          "Server error. Please try again later.",
      });
    }

    return Promise.reject({
      success: false,
      status,
      message:
        error.response.data?.message ||
        "Something went wrong.",
      errors: error.response.data?.errors,
    });
  },
);

// ======================
// ERROR MESSAGE HELPER
// ======================
export const getApiErrorMessage = (
  error: any
): string => {
  return (
    error?.message ||
    error?.response?.data?.message ||
    "Something went wrong"
  );
};

export default api;