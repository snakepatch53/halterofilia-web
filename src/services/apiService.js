import { useAuthStore } from "../stores/useAuthStore";

const isProduction = import.meta.env.MODE == "production";
const API_URL = isProduction ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_URL_LOCAL;

export async function apiService({ resource, method = "GET", data = null, printResponse = false, formData = false }) {
    const token = useAuthStore.getState().token;
    let body = formData ? data : JSON.stringify(data);
    body = method === "GET" ? null : body;

    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
    if (!formData) headers.append("Content-Type", "application/json");
    const response = await fetch(API_URL + resource, {
        method,
        headers,
        body,
    }).then(async (res) => {
        if (printResponse) console.log(res);
        const statusCode = res.status;
        const response = await res?.json();
        return {
            statusCode,
            success: res.ok,
            ...response,
        };
    });

    return response;
}
