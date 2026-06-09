import { apiRequest } from "../../services/request";
import { ApiResponse } from "../../types/api.types";
import {
  ForgotPasswordPayload,
  LoginPayload,
  PasswordChangePayload,
  ResetPasswordPayload,
} from "./auth.types";

export const loginApi = (payload: LoginPayload) =>
  apiRequest.post("/auth/login", payload, {
    showSuccessToast: true,
  });

export const getProfile = () => apiRequest.get<ApiResponse>("/profile");

export const forgotPasswordApi = (payload: ForgotPasswordPayload) =>
  apiRequest.post("/auth/forgot-password", payload, {
    successMessage: "Password reset link sent to your email.",
    showSuccessToast: true,
  });

export const verifyOtp = (payload: { otp: string }) =>
  apiRequest.post("/auth/verify-otp", payload, {
    successMessage: "OTP verified successfully.",
    showSuccessToast: true,
  });

export const resetPasswordApi = (payload: ResetPasswordPayload) =>
  apiRequest.post("/auth/reset-password", payload, {
    successMessage:
      "Password reset successfully. Please login with your new password.",
    showSuccessToast: true,
  });

  export const changePasswordApi = (payload: PasswordChangePayload) => 
    apiRequest.post("/auth/change-password", payload, {
      showSuccessToast: true,
    })
