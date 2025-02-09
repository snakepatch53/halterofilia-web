import { useEffect } from "react";
import { connectSocket, disconnectSocket, listenToEvent } from "../services/socketService";
import { useAuthStore } from "../stores/useAuthStore";
import { usePanelStore } from "../stores/usePanelStore";

export default function useApp() {
    const { darkMode } = usePanelStore((state) => state);
    const setSocketId = useAuthStore((state) => state.setSocketId);
    const login = useAuthStore((state) => state.login);
    const logout = useAuthStore((state) => state.logout);
    useEffect(() => {
        connectSocket(({ id }) => {
            setSocketId(id);
        });

        return () => disconnectSocket();
    }, [setSocketId]);

    useEffect(() => {
        listenToEvent("onlogin", (data) => {
            // console.log(data);

            const { isLogged } = data;
            if (isLogged) return login(data.user, data.access_token);
            logout();
        });
    }, [login, logout]);

    // Sincronizar el estado del dark mode con la clase en el documento
    useEffect(() => {
        if (darkMode) document.documentElement.classList.add("dark"); // Añadir clase 'dark' al <html>
        else document.documentElement.classList.remove("dark"); // Eliminar la clase 'dark'
    }, [darkMode]); // Se ejecuta cada vez que isDarkMode cambia
}
