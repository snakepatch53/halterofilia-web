import { apiService } from "./apiService";

export async function list(resource) {
    const res = await apiService({
        resource,
        method: "GET",
    });

    if (res?.success && res?.response) return res?.response;
    else [];
}

export async function save(resource, data, isFormData = false) {
    const res = await apiService({
        resource,
        method: "POST",
        data,
        formData: isFormData,
    });
    if (res?.success && res?.response) return res?.response;
    else false;
}

export async function edit(resource, data, id, isFormData = false) {
    const res = await apiService({
        resource: resource + "/" + id,
        method: "PATCH",
        data,
        formData: isFormData,
    });
    if (res?.success && res?.response) return res?.response;
    else false;
}

export async function remove(resource, id) {
    const res = await apiService({
        resource: resource + "/" + id,
        method: "DELETE",
    });
    if (res?.success && res?.response) return res?.response;
    else false;
}
