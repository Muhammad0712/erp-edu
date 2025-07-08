import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { groupsService } from "../service"
import type { Group } from "../types/group";



const useGroup = () => {
    const queryClient = useQueryClient()
    const { data } = useQuery({
        queryKey: ['groups'],
        queryFn: async () => groupsService.getGroups()
    });

    const useGroupCreate = () => {
        return useMutation({
            mutationFn: async(data: Group)=> groupsService.createGroup(data),
            onSuccess: ()=> {
                queryClient.invalidateQueries({queryKey: ['groups']})
            }
        })
    }

    const useGroupUpdate = () => {
        return useMutation({
            mutationFn: async(data: Group)=> groupsService.updateGroup(data),
            onSuccess: ()=> {
                queryClient.invalidateQueries({queryKey: ['groups']})
            }
        })
    }

    const useGroupDelete = () => {
        return useMutation({
            mutationFn: async(id: number)=> groupsService.deleteGroupById(id) ,
            onSuccess: ()=> {
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

export default useGroup