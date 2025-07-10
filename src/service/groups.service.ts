import { apiConfig } from "@api/config"
import { ApiUrls } from "@api/api-urls";
import type { Group } from "@types";


export const groupsService = {

    async createGroup(payload: Group): Promise<any>{
        const res = await apiConfig().postRequest(ApiUrls.GROUPS, payload)
        return res
    },

    async getGroups(): Promise<any>{
        const res = await apiConfig().getRequest(ApiUrls.GROUPS);
        return res
    },

    async getGroupById(model: Group): Promise<any>{
        const res = await apiConfig().getRequest(`${ApiUrls.GROUPS}${model.id}`)
        return res
    },

    async updateGroup(model: Group, id: number): Promise<any>{
        const res = await apiConfig().patchRequest(`${ApiUrls.GROUPS}/${id}`, model)
        return res
    },

    async deleteGroupById(model: Group): Promise<any>{
        const res = await apiConfig().deleteRequest(`${ApiUrls.GROUPS}/${model.id}`)
        return res
    }

}