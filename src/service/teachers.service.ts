import type { ParamsType, TeacherType } from "@types";
import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";


export const teacherService = {

    async getTeachers(params?: ParamsType) {
        const res = await apiConfig().getRequest(ApiUrls.TEACHERS, params)
        return res;
    },
    async getTeacherById(params: ParamsType, id: number) {
        const res = await apiConfig().getRequest(`${ApiUrls.TEACHERS}/${id!}`, params)
        return res;
    },
    async createTeacher(payload: TeacherType): Promise<any> {
        const res = await apiConfig().postRequest(ApiUrls.TEACHERS, payload)
        return res;
    },
    async updateTeacher(model: TeacherType): Promise<any> {
        const res = await apiConfig().patchRequest(`${ApiUrls.TEACHERS}/${model.id}`, model);
        return res
    },
    async deleteTeacher(id: number): Promise<any> {
        const res = await apiConfig().deleteRequest(`${ApiUrls.TEACHERS}/${id}`);
        return res
    }
}