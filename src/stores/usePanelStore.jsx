import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePanelStore = create(
    persist(
        (set) => ({
            openSidebar: true,
            darkMode: false,
            toggleSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),
            toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

            // no local storage
            headerComponent: () => <h1 className=" tracking-widest uppercase ">Hola, Bienvenido!</h1>,
            setHeaderComponent: (component) => set(() => ({ headerComponent: component })),
            resetHeaderComponent: () =>
                set(() => ({
                    headerComponent: () => <h1 className=" tracking-widest uppercase ">Hola, Bienvenido!</h1>,
                })),
        }),
        {
            name: "panel",
            // discart the headerComponent from the store
            partialize: (state) => {
                delete state.headerComponent;
                return state;
            },
        }
    )
);
