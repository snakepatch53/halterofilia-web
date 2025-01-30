import { apiService } from "./apiService";

const resource = "user";

export async function list() {
    const res = await apiService({
        resource,
        method: "GET",
    });

    if (res?.success && res?.response) return res?.response;
    else [];
}

export async function save(data) {
    const res = await apiService({
        resource,
        method: "POST",
        data,
    });
    if (res?.success && res?.response) return res?.response;
    else false;
}

export async function edit(data, id) {
    const res = await apiService({
        resource: resource + "/" + id,
        method: "PATCH",
        data,
    });
    if (res?.success && res?.response) return res?.response;
    else false;
}

export async function remove(id) {
    const res = await apiService({
        resource: resource + "/" + id,
        method: "DELETE",
    });
    if (res?.success && res?.response) return res?.response;
    else false;
}
