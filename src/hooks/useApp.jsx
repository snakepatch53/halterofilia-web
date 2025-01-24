import { useEffect } from "react";
import { connectSocket, disconnectSocket, listenToEvent } from "../services/socketService";
import { useAuthStore } from "../stores/useAuthStore";

export default function useApp() {
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
            const { isLogged } = data;
            if (isLogged) return login(data.user, data.access_token);
            logout();
        });
    }, [login, logout]);
}
