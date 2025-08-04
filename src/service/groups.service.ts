import type { GroupsType, GroupTeachersType, ParamsType } from "@types";
import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";


export const groupsService = {
    // Groups querys
    async getGroups(params: ParamsType){
        const res = await apiConfig().getRequest(ApiUrls.GROUPS, params);
        return res
    },
    async getGroupById(params: ParamsType, id: number){
        const res = await apiConfig().getRequest(`${ApiUrls.GROUPS}/${id!}`, params) 
        return res
    },  

    // Group students relation
    async getStudentsByGroupId(params: ParamsType, id: number){
        const res = await apiConfig().getRequest(`${ApiUrls.GROUP_STUDENTS_BY_GROUP_ID}/${id!}`, params)
        return res
    },

    // Group teachers relation
    async getTeachersByGroupId(params: ParamsType, id: number){
        const res = await apiConfig().getRequest(`${ApiUrls.GROUP_TEACHERS_BY_TEACHER_ID}/${id!}`, params)
        return res
    },
    async addGroupTeacher(model: GroupTeachersType){
        const res = await apiConfig().postRequest(`${ApiUrls.GROUP_TEACHERS}`, model)
        return res
    },
    async deleteGroupTeacher(id: number): Promise<any>{
        const res = await apiConfig().deleteRequest(`${ApiUrls.GROUP_TEACHERS}/${id}`)
        return res
    },

    // Group mutations
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