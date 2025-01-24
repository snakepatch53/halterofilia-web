import { apiService } from "./apiService";

export async function login(data) {
    console.log(data);
    const res = await apiService({
        resource: "auth/login",
        method: "POST",
        data,
    });

    if (res?.success) {
        return true;
    }
    return false;
}

export function logout() {
    apiService({
        resource: "auth/logout",
        method: "POST",
    });
}
