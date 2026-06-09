export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  password: string;
}

export interface PasswordChangePayload {
  currentPassword: string;
  newPassword: string;
}
