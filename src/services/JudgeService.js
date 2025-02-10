import { apiService } from "./apiService";

const resource = "judge";

export async function findAllByCategoryId(id, httpQuery = "") {
    return await apiService({ resource: `${resource}/category/${id}${httpQuery}` });
}
