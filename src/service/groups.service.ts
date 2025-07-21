import type { Group, ParamsType } from "@types";
import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";


export const groupsService = {
    async getGroups(params: ParamsType){
        const res = await apiConfig().getRequest(ApiUrls.GROUPS, params);
        return res
    },
    async getGroupById(params: ParamsType, id: number){
        const res = await apiConfig().getRequest(`${ApiUrls.GROUPS}/${id!}`, params)
        return res
    },  
    async createGroup(payload: Group): Promise<any>{
        const res = await apiConfig().postRequest(ApiUrls.GROUPS, payload)
        return res
    },
    async updateGroup(model: Group): Promise<any>{
        const res = await apiConfig().patchRequest(`${ApiUrls.GROUPS}/${model.id}`, model)
        return res
    },
    async deleteGroup(id: number): Promise<any>{
        const res = await apiConfig().deleteRequest(`${ApiUrls.GROUPS}/${id}`)
        return res
    },
}