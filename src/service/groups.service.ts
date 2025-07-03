import { apiConfig } from "@api/config"
import { ApiUrls } from "../api/api-urls";
export const groupsService = {
    async getGroups(){
        const res = await apiConfig().getRequest(ApiUrls.GROUPS);
        return res
    }

}