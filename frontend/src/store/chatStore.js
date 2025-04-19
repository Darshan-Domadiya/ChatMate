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
      set({ users: res.data.users });
    } catch (error) {
      console.log("ERROR while getting all users!", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (clickedUserId) => {
    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance.get(
        `/message/userMessages/${clickedUserId}`
      );
      set({ messages: res.data });
      console.log("user messages", res)
    } catch (error) {
      toast.error(error.respose.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedUser : (user) => set({ selectedUser : user }),
}));
