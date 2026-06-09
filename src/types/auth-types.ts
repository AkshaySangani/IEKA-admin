export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
  passwordChangedAt: string | null;
  company: {
    companyName?: string;
    gstin?: string;
    companyEmail?: string;
    companyLogo: string;
  }
}

export interface AuthState {
  token: string | null; 
  profile: UserProfile | null;

  setToken: (token: string) => void;
  setProfile: (profile: UserProfile) => void;

  clearAuth: () => void;

  isAuthenticated: () => boolean;
}