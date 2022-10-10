import create from "zustand";
import { devtools } from "zustand/middleware";

const authStore = (set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  authStart: () =>
    set((state) => ({
      ...state,
      loading: true,
    })),
  setUser: (user, token) =>
    set((state) => {
      localStorage.setItem("token", token);
      return {
        ...state,
        user,
        token,
        loading: false,
      };
    }),
  signout: () =>
    set((state) => {
      localStorage.removeItem("token");
      return { ...state, user: null, loading: false };
    }),
});

const useAuthStore = create(devtools(authStore, { name: "AuthStore" }));

export default useAuthStore;
