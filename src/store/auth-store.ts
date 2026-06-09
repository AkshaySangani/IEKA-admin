import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AuthState } from "../types/auth-types";
import { storageKeys } from "../constants/constants";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      profile: null,

      setToken: (token) =>
        set({
          token,
        }),

      setProfile: (profile) =>
        set({
          profile,
        }),

      clearAuth: () =>
        set({
          token: null,
          profile: null,
        }),

      isAuthenticated: () => {
        return !!get().token;
      },
    }),
    {
      name: storageKeys.authStorage,
    }
  )
);