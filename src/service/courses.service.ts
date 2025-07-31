import { ApiUrls } from "@api/api-urls"
import { apiConfig } from "@api/config"
import type { CoursesType, ParamsType } from "@types"

export const coursesService = {
    
    async createCourse(payload: CoursesType) {
        const res = await apiConfig().postRequest(`${ApiUrls.COURSES}`, payload)
        return res
    },
    async getAllCourses(params?: ParamsType) {
        const res = await apiConfig().getRequest(ApiUrls.COURSES, params)
        return res
    },
    async getCoursebyId(model: CoursesType) {
        const res = await apiConfig().getRequest(`${ApiUrls.COURSES}/${model.id}`)
        return res
    },
    async updateCourse(model: CoursesType, id: number) {
        const res = await apiConfig().patchRequest(`${ApiUrls.COURSES}/${id}`, model)
        return res
    },
    async deleteCourse(id: number): Promise<any> {
        const res = await apiConfig().deleteRequest(`${ApiUrls.COURSES}/${id}`)
        return res
    }
}
