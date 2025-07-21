import { ApiUrls } from "@api/api-urls"
import { apiConfig } from "@api/config"
import type { Course, ParamsType } from "@types"

export const coursesService = {
    
    async createCourse(payload: Course) {
        const res = await apiConfig().postRequest(`${ApiUrls.COURSES}`, payload)
        return res
    },
    async getAllCourses(params?: ParamsType) {
        const res = await apiConfig().getRequest(ApiUrls.COURSES, params)
        return res
    },
    async getCoursebyId(model: Course) {
        const res = await apiConfig().getRequest(`${ApiUrls.COURSES}/${model.id}`)
        return res
    },
    async updateCourse(model: Course) {
        const res = await apiConfig().patchRequest(`${ApiUrls.COURSES}/${model.id}`, model)
        return res
    },
    async deleteCourse(id: number): Promise<any> {
        const res = await apiConfig().deleteRequest(`${ApiUrls.COURSES}/${id}`)
        return res
    }
}
