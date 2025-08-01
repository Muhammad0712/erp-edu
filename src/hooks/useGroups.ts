import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { groupsService } from "@service/groups.service"
import type { GroupsType, ParamsType } from "@types";


export const useGroup = (params?: ParamsType, id?: number) => {
    const queryClient = useQueryClient()
    const { data } = useQuery({
        queryKey: ['groups', params],
        queryFn: async () => groupsService.getGroups(params!)
    });
    const getGroupById = useQuery({
        queryKey: ['group', id],
        queryFn: async () => groupsService.getGroupById(params!, id!),
        enabled: !!id
    });
    const group = getGroupById.data;

    const getStudentsByGroupId = useQuery({
        queryKey: ['group-students', params],
        queryFn: async () => groupsService.getStudentsByGroupId(params!, id!),
        enabled: !!id
    });
    const students = getStudentsByGroupId.data;

    const getTeachersByGroupId = useQuery({
        queryKey: ['group-teachers', params],
        queryFn: async () => groupsService.getTeachersByGroupId(params!, id!),
        enabled: !!id
    })
    const teachers = getTeachersByGroupId.data;

    const useGroupCreate = () => {
        return useMutation({
            mutationFn: async (data: GroupsType) => groupsService.createGroup(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['groups'] })
            }
        })
    }
    const useGroupUpdate = () => {
        return useMutation({
            mutationFn: async ({ data, id }: { data: GroupsType, id: number}) => {
                console.log(data, "data");
                console.log(id, "id");
                return groupsService.updateGroup(data, id);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['groups'] })
            }
        })
    }
    const useGroupDelete = () => {
        return useMutation({
            mutationFn: async (id: number) => groupsService.deleteGroup(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['groups'] })
            }
        })
    }
    return {
        data,
        group,
        students,
        teachers,
        useGroupCreate,
        useGroupUpdate,
        useGroupDelete
    }
}
