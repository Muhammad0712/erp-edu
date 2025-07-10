import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { groupsService } from "@service/groups.service"
import type { Group } from "@types";



const useGroup = () => {
    const queryClient = useQueryClient()
    const { data } = useQuery({
        queryKey: ['groups'],
        queryFn: async () => groupsService.getGroups()
    });

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
            mutationFn: async ({ data, id }: { data: Group, id: number }) => {
                groupsService.updateGroup(data, id)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['groups'] })
            }
        })
    }

    const useGroupDelete = () => {
        return useMutation({
            mutationFn: async (data: Group) => groupsService.deleteGroupById(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['groups'] })
            }
        })

    }

    return {
        data,
        useGroupCreate,
        useGroupUpdate,
        useGroupDelete
    }
}

export {
    useGroup
}