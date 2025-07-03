import { apiConfig } from "@api/config"
import { ApiUrls } from "../api/api-urls";
import type { Group } from "../types/group";

export const groupsService = {

    async createGroup(data: Group){
        const res = await apiConfig().postRequest(ApiUrls.GROUPS, data)
        return res
    },

    async getGroups(){
        const res = await apiConfig().getRequest(ApiUrls.GROUPS);
        return res
    },

    async getGroupById(id: string){
        const res = await apiConfig().getRequest(`${ApiUrls.GROUPS}${id}`)
        return res
    },

    async updateGroupById(id: string, data: any){
        const res = await apiConfig().putRequest(`${ApiUrls.GROUPS}${id}`, data)
        return res
    },

    async deleteGroupById(id: string){
        const res = await apiConfig().deleteRequest(`${ApiUrls.GROUPS}${id}`)
        return res
    }

}