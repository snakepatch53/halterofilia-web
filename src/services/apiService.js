import { useAuthStore } from "../stores/useAuthStore";

const isProduction = import.meta.env.MODE == "production";
const API_URL = isProduction ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_URL_LOCAL;

export async function apiService({ resource, method = "GET", data = null, printResponse = false, formData = false }) {
    const token = useAuthStore.getState().token;
    let body = null;
    if (data) body = formData ? data : JSON.stringify(data);
    body = method === "GET" ? null : body;
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
    if (!formData) headers.append("Content-Type", "application/json");
    const options = { method, headers, body };
    return await fetch(API_URL + resource, options).then(async (res) => {
        if (printResponse) console.log(res);
        const response = await res?.json();
        return response;
    });
}
