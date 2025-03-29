import { create } from "zustand";
import { axiosInstance } from "../utils/axios.js";

export const store = create((set) => ({
  authUser: null,

  isSigningUp: false,
  isLogginUp: false,
  isUpdatingUp: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/authCheck");

      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in AuthCheck", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async () => {
        
  },
}));
