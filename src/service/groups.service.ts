import type { GroupsType, ParamsType } from "@types";
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
    async getStudentsByGroupId(params: ParamsType, id: number){
        const res = await apiConfig().getRequest(`${ApiUrls.GROUP_STUDENTS}/${id!}/`, params)
        return res
    },
    async getTeachersByGroupId(params: ParamsType, id: number){
        const res = await apiConfig().getRequest(`${ApiUrls.GROUP_TEACHERS}/${id!}/`, params)
        return res
    },
    async createGroup(payload: GroupsType): Promise<any>{
        const res = await apiConfig().postRequest(ApiUrls.GROUPS, payload)
        return res
    },
    async updateGroup(model: GroupsType, id: number): Promise<any>{
        const res = await apiConfig().patchRequest(`${ApiUrls.GROUPS}/${id}`, model)
        return res
    },
    async deleteGroup(id: number): Promise<any>{
        const res = await apiConfig().deleteRequest(`${ApiUrls.GROUPS}/${id}`)
        return res
    },
}