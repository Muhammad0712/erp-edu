import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { groupsService } from "@service/groups.service"
import type { Group, ParamsType } from "@types";



export const useGroup = (params: ParamsType, id?: number) => {
    const queryClient = useQueryClient()
    const { data } = useQuery({
        queryKey: ['groups', params],
        queryFn: async () => groupsService.getGroups(params)
    });
    const getStudentsByGroupId = useQuery({
        queryKey: ['group-students', params],
        queryFn: async () => groupsService.getGroupById(params, id!),
        enabled: !!id
        
    });
    const students = getStudentsByGroupId.data;

    const useGroupCreate = () => {
        return useMutation({
            mutationFn: async (data: Group) => groupsService.createGroup(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['groups'] })
            }
        })
    }

    const useGroupUpdate = () => {
        return useMutation({
            mutationFn: async (data: Group) => {
                groupsService.updateGroup(data)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['groups'] })
            }
        })
    }
    const useGroupDelete = () => {
        return useMutation({
            mutationFn: async (id: number) => groupsService.deleteGroupById(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['groups'] })
            }
        })
    }
    return {
        data,
        students,
        useGroupCreate,
        useGroupUpdate,
        useGroupDelete
    }
}
