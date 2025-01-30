import { apiService } from "./apiService";

const resource = "institution";

export async function list() {
    const res = await apiService({
        resource: `${resource}?include=user`,
        method: "GET",
    });
    console.log(res);

    if (res?.success && res?.response) return res?.response;
    else [];
}

export async function save(data) {
    const res = await apiService({
        resource: `${resource}?include=user`,
        method: "POST",
        data,
    });
    if (res?.success && res?.response) return res?.response;
    else false;
}

export async function edit(data, id) {
    const res = await apiService({
        resource: `${resource}/${id}?include=user`,
        method: "PATCH",
        data,
    });
    console.log(res);
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
