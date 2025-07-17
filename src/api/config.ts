import axiosInstance from ".";
import { Notification } from "@helpers";

export function apiConfig() {
    async function getRequest(url: string, params: object = {}) {
        try {
            const res = await axiosInstance.get(url, { params });
            return res
        } catch (error: any) {
            console.log(error?.response?.data);
            Notification('error', error?.message)
        }
    }

    async function postRequest(url: string, body: object = {}) {
        try {
            const res = await axiosInstance.post(url, body);
            if (res.status === 201 || res.status === 200) {
                Notification('success', res.data.message)
                return res
            }
            return res;
        } catch (error: any) {
            console.log(error?.response?.data);
            Notification('error', error?.message)
        }
    }

    async function putRequest(url: string, body: object = {}) {
        try {
            const res = await axiosInstance.put(url, body);
            if (res.status === 200) {
                Notification('success', res.data.message)
                return res
            }
            return res;
        } catch (error: any) {
            console.log(error?.response?.data);
            Notification('error', error?.message)
        }
    }

    async function patchRequest(url: string, body: object = {}) {
        try {
            const res = await axiosInstance.patch(url, body);
            if (res.status === 200) {
                Notification('success', res.data.message)
                return res
            }
            return res;
        } catch (error: any) {
            console.log(error?.response?.data);
            Notification('error', error?.message)
        }
    }

    async function deleteRequest(url: string, params: object = {}) {
        try {
            const res = await axiosInstance.delete(url, { params });
            if (res.status === 200) {
                Notification('success', res.data.message)
                return res
            }
            return res;
        } catch (error: any) {
            console.log(error?.response?.data);
            Notification('error', error?.message)
        }
    }


    return {
        getRequest,
        postRequest,
        putRequest,
        patchRequest,
        deleteRequest
    }
}