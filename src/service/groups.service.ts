import { apiConfig } from "@api/config"
import { ApiUrls } from "../api/api-urls";
import type { Group } from "../types/group";

export const groupsService = {

    async createGroup(payload: Group){
        const res = await apiConfig().postRequest(ApiUrls.GROUPS, payload)
        return res
    },

    async getGroups(){
        const res = await apiConfig().getRequest(ApiUrls.GROUPS);
        return res
    },

    async getGroupById(id: number){
        const res = await apiConfig().getRequest(`${ApiUrls.GROUPS}${id}`)
        return res
    },

    async updateGroupById(id: number, data: object){
        const res = await apiConfig().patchRequest(`${ApiUrls.GROUPS}${id}`, data)
        return res
    },

    async deleteGroupById(id: number){
        const res = await apiConfig().deleteRequest(`${ApiUrls.GROUPS}${id}`)
        return res
    }

}