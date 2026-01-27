import { create } from "zustand";
import { secureGet, secureSet, secureRemove } from "../lib/secure"
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL as string

// Define types for user and store
interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: any;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  loading: boolean;

  saveAuthData: (accessToken: string, userData: User) => void;
  logout: () => void;
  fetchUser: (accessToken?: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: (secureGet("user") as User) || null,
  token: (secureGet("accessToken") as string) || null,
  loading: false,

  saveAuthData: (accessToken: string, userData: any) => {
    set({ user: userData, token: accessToken });
    secureSet("accessToken", accessToken);
    secureSet("user", userData);
  },

  logout: () => {
    set({ user: null, token: null });
    secureRemove("accessToken");
    secureRemove("user");
    toast.success("Logged out successfully");
  },

  fetchUser: async (accessToken) => {
    const tokenToUse = accessToken || get().token;
    if (!tokenToUse) return;

    set({ loading: true });

    try {
      const res = await axios.get<User>(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${tokenToUse}` },
      });

      const userData = res.data;
      set({ user: userData });
      secureSet("user", userData);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      toast.error("Failed to fetch user data");
    } finally {
      set({ loading: false });
    }
  },
}));

// Auto-fetch user on app start if token exists
const { token, fetchUser } = useAuthStore.getState();
if (token) fetchUser(token);
