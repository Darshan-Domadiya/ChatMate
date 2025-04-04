import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const chatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUser: async () => {
    set({ isUsersLoading: true });

    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      console.log("ERROR while getting all users!", error);
    } finally {
      set({ isUsersLoading: false });
    }
  },
}));
