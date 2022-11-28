import create from "zustand";
import { devtools } from "zustand/middleware";
import { setAuthToken } from "../utils/axios";

const authStore = (set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: "",
  authStart: () =>
    set((state) => ({
      ...state,
      loading: true,
      error: "",
    })),

  setUser: (user, token) =>
    set((state) => {
      localStorage.setItem("token", token);
      setAuthToken(token);
      return {
        ...state,
        user,
        token,
        loading: false,
        error: "",
      };
    }),
  signout: () =>
    set((state) => {
      localStorage.removeItem("token");
      return { ...state, user: null, loading: false, error: "", token: null };
    }),
  setError: (msg) =>
    set((state) => ({
      ...state,
      loading: false,
      error: msg,
    })),
});

const useAuthStore = create(devtools(authStore, { name: "AuthStore" }));

export default useAuthStore;
