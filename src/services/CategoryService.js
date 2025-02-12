import { apiService } from "./apiService";

const resource = "category";

export async function findAllByChampionshipId(id, httpQuery = "") {
    const res = await apiService({ resource: `${resource}/championship/${id}${httpQuery}` });
    return res;
}

export async function findOne(id) {
    return await apiService({ resource: `${resource}/${id}?include=championship` });
}
