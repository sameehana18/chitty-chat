import axios from "axios";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";


export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({authUser: res.data});
        } catch (error) {
            console.log("Error in checkAuth", error);
            set({authUser: null});
        }finally{
            set({isCheckingAuth: false})
        }
    },

    signup: async (data) => {
        set({isSigningUp: true});

        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser: res.data});
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isSigningUp: false});
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
        //   console.log("res", res);
          set({ authUser: res.data });
          toast.success("Logged in successfully");
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({isUpdatingProfile: true});

        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            // console.log("data from use store upadte profile", res.data);
            set({authUser: res.data});
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error in updateProfile", error);
            toast.error(error.response.data.message);
        } finally {
            set({isUpdatingProfile: false});
        }
    }
}))