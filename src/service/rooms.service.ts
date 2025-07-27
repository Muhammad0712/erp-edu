import { ApiUrls } from "@api/api-urls"
import { apiConfig } from "@api/config"
import type { ParamsType, RoomsType } from "@types"

export const roomsService = {
    
    async createRoom(payload: RoomsType) {
        const res = await apiConfig().postRequest(`${ApiUrls.ROOMS}`, payload)
        return res
    },
    async getAllRooms(params?: ParamsType) {
        const res = await apiConfig().getRequest(ApiUrls.ROOMS, params)
        return res
    },
    async getRoombyId(model: RoomsType) {
        const res = await apiConfig().getRequest(`${ApiUrls.ROOMS}/${model.id}`)
        return res
    },
    async updateRoom(model: RoomsType) {
        const res = await apiConfig().patchRequest(`${ApiUrls.ROOMS}/${model.id}`, model)
        return res
    },
    async deleteRoom(id: number): Promise<any> {
        const res = await apiConfig().deleteRequest(`${ApiUrls.ROOMS}/${id}`)
        return res
    }
}
