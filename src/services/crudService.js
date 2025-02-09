import { apiService } from "./apiService";

export async function list(resource, httpQuery = "") {
    const res = await apiService({
        resource: resource + httpQuery,
        method: "GET",
    });
    return res;
}

export async function save(resource, data, isFormData = false, httpQuery = "") {
    return await apiService({
        resource: resource + httpQuery,
        method: "POST",
        data,
        formData: isFormData,
    });
}

export async function edit(resource, data, id, isFormData = false, httpQuery = "") {
    return await apiService({
        resource: resource + "/" + id + httpQuery,
        method: "PATCH",
        data,
        formData: isFormData,
    });
}

export async function remove(resource, id) {
    return await apiService({
        resource: resource + "/" + id,
        method: "DELETE",
    });
}
