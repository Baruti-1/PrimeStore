import { create } from "zustand";
import axios from "../config/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data, loading: false });
      toast.success("Signup success");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An error occur, try again!");
    }
  },

  login: async (email, password) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/signin", { email, password });
      set({ user: res.data, loading: false });
      toast.success("Login success");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An error occur, try again!");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/signout");
      set({ user: null });
      toast.success("Sigout success");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Logout error please try again"
      );
    }
  },
}));
