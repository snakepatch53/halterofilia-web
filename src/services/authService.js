import { apiService } from "./apiService";

export async function login({ username, password }) {
    const res = await apiService({
        resource: "auth/login",
        method: "POST",
        data: {
            username,
            password,
        },
    });

    console.log(res);
    if (res?.success) {
        localStorage.setItem("session", res.access_token);
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
