import {create} from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async(email, password, name)=> {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup", {email, password, name});
            set({user: response.data.user, isAuthenticated:true, isLoading:false});
        } catch (error) {
            set({error: error.response.data.message || "Error signing up", isLoading:false});
            throw error;
        }
    },

    verifyEmail: async(code)=>{
        set({isLoading:true, error:null});
        try {
            const response = await axios.post("http://localhost:5000/api/auth/verify-email", {code});
            set({user: response.data.user, isAuthenticated:true, isLoading:false});
            return response.data;
        } catch (error) {
            set({error: error.response.data.message || "Error verifying email", isLoading:false});
            throw error;
        }
    },

    checkAuth: async() => {
        // await new Promise((resolve)=> setTimeout(resolve,1000));
        set({isCheckingAuth: true, error: null})
        try {
            const response = await axios.get("http://localhost:5000/api/auth/check-auth");
            set({isAuthenticated:true, user: response.data.user, isCheckingAuth: false});
        } catch (error) {
            set({error: null, isCheckingAuth:false, isAuthenticated: false});
        }
    },

    login: async(email, password)=> {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {email, password});
            set({isAuthenticated:true, user: response.data.user, error:null, isLoading:false});
        } catch (error) {
            set({error: error.response.data.message || "Error logging in", isLoading:false});
            throw error;
        }
    },

    logout: async()=> {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post("http://localhost:5000/api/auth/logout");
            set({isAuthenticated:false, user: null, error:null, isLoading:false});
        } catch (error) {
            set({error: error.response.data.message || "Error logging out", isLoading:false});
            throw error;
        }
    },

    forgotPassword: async(email)=> {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post("http://localhost:5000/api/auth/forgot-password", {email});
            set({message: response.data.message, isLoading: false});
        } catch (error) {
            set({error: error.response.data.message || "Error sending reset password email", isLoading:false});
            throw error;
        }
    },

    resetPassword: async(token, password)=> {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {password});
            set({message: response.data.message, isLoading: false});
        } catch (error) {
            set({error: error.response.data.message || "Error resetting password", isLoading:false});
            throw error;
        }
    }
}))
