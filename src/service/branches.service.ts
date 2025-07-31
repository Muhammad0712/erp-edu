import { ApiUrls } from "@api/api-urls"
import { apiConfig } from "@api/config"
import type { BranchesType, ParamsType } from "@types"

export const branchesService = {
    
    async createBranch(payload: BranchesType) {
        const res = await apiConfig().postRequest(`${ApiUrls.BRANCHES}`, payload)
        return res
    },
    async getAllBranches(params?: ParamsType) {
        const res = await apiConfig().getRequest(ApiUrls.BRANCHES, params)
        return res
    },
    async getBranchbyId(model: BranchesType) {
        const res = await apiConfig().getRequest(`${ApiUrls.BRANCHES}/${model.id}`)
        return res
    },
    async updateBranch(model: BranchesType, id: number) {
        const res = await apiConfig().patchRequest(`${ApiUrls.BRANCHES}/${id}`, model)
        return res
    },
    async deleteBranch(id: number): Promise<any> {
        const res = await apiConfig().deleteRequest(`${ApiUrls.BRANCHES}/${id}`)
        return res
    }
}