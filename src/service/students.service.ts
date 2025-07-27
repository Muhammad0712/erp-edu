import type { ParamsType, StudentsType } from "@types";
import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";


export const studentsService = {

    async getStudents(params?: ParamsType) {
        const res = await apiConfig().getRequest(ApiUrls.STUDENTS, params)
        return res;
    },
    async getStudentById(params: ParamsType, id: number) {
        const res = await apiConfig().getRequest(`${ApiUrls.STUDENTS}/${id!}`, params)
        return res;
    },
    async createStudent(payload: StudentsType): Promise<any> {
        const res = await apiConfig().postRequest(ApiUrls.STUDENTS, payload)
        return res;
    },
    async updateStudent(model: StudentsType): Promise<any> {
        const res = await apiConfig().patchRequest(`${ApiUrls.STUDENTS}/${model.id}`, model);
        return res
    },
    async deleteStudent(id: number): Promise<any> {
        const res = await apiConfig().deleteRequest(`${ApiUrls.STUDENTS}/${id}`);
        return res
    }
}