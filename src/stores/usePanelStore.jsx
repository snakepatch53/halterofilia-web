import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePanelStore = create(
    persist(
        (set) => ({
            openSidebar: true,
            toggleSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),
        }),
        {
            name: "panel",
        }
    )
);
