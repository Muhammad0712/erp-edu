import { ApiUrls } from "../api/api-urls"
import { apiConfig } from "../api/config"

export const coursesService = {
    async getAllCourses() {
        const res = await apiConfig().getRequest(`${ApiUrls.COURSES}`)
        return res
    }
}