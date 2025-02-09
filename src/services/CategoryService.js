import { apiService } from "./apiService";

const resource = "category";

export async function findAllByChampionshipId(id, httpQuery = "") {
    return await apiService({ resource: `${resource}/championship/${id}${httpQuery}` });
}
