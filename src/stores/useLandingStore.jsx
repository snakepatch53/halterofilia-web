import { create } from "zustand";

export const useLandingStore = create((set) => ({
    openMenu: false,
    toggleMenu: () => set((state) => ({ openMenu: !state.openMenu })),
}));
