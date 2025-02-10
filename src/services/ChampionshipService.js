import { apiService } from "./apiService";

const resource = "championship";

export async function findOne(id) {
    return await apiService({ resource: `${resource}/${id}` });
}
