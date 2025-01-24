import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            socketId: null,
            isLogged: false,
            setSocketId: (socketId) => set({ socketId }),
            login: (user, token) => set({ user, token, isLogged: true }),
            logout: () => set({ user: null, token: null, isLogged: false }),
        }),
        {
            name: "auth",
        }
    )
);
