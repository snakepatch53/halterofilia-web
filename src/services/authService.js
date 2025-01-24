import { useAuthStore } from "../stores/useAuthStore";
import { apiService } from "./apiService";

export async function login(data) {
    const socketId = useAuthStore.getState().socketId;
    const res = await apiService({
        resource: "auth/login",
        method: "POST",
        data: { ...data, socketId },
    });

    if (res?.success) {
        return true;
    }
    return false;
}

export async function logout() {
    const socketId = useAuthStore.getState().socketId;
    apiService({
        resource: "auth/logout",
        method: "POST",
        data: { socketId },
    });
}
