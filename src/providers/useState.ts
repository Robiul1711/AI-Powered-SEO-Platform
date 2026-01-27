import { create } from "zustand";

interface ValueStore {
  email: string;
  resetToken: string;

  setEmail: (value: string) => void;
  setResetToken: (value: string) => void;
}

export const useValueStore = create<ValueStore>((set) => ({
  email: "",
  resetToken: "",

  setEmail: (value) => set({ email: value }),

  setResetToken: (value) => set({ resetToken: value }),
}));
