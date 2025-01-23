import { safeParseJSON } from "../common/utils";

const isProduction = import.meta.env.MODE == "production";
export const API_URL = isProduction ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_URL_LOCAL;

export async function apiService({ resource, method = "GET", data = null, printResponse = false, formData = false }) {
    const session = safeParseJSON(localStorage.getItem("session"));
    const sessionToken = session?.token;

    let body = formData ? data : JSON.stringify(data);
    body = method === "GET" ? null : body;

    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Authorization", sessionToken ? `Bearer ${sessionToken}` : "");
    if (!formData) headers.append("Content-Type", "application/json");
    const response = await fetch(API_URL + resource, {
        method,
        headers,
        body,
    }).then((res) => {
        const statusCode = res.status;
        return {
            statusCode,
            success: res.ok,
            ...res.json(),
        };
    });

    if (printResponse) console.log(response);
    return response;
}
