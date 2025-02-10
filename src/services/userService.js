import { apiService } from "./apiService";

const resource = "user";

export async function list() {
    return await apiService({
        resource,
        method: "GET",
    });
}
