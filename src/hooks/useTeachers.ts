import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ParamsType, TeachersType } from "@types";
import { teacherService } from "@service/teachers.service";


export const useTeachers = (params?: ParamsType, id?: number) => {
    const queryClient = useQueryClient()
    const { data } = useQuery({
        queryKey: ['teachers', params],
        queryFn: async () => teacherService.getTeachers(params)
    });
    const { data: students } = useQuery({
        queryFn: async () => teacherService.getTeacherGroupById(id!),
        queryKey: ["teacher-group-students"],
        enabled: !!id,
    });
    const useTeacherCreate = () => {
        return useMutation({
            mutationFn: async (data: TeachersType) => teacherService.createTeacher(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['teachers'] })
            }
        })
    }
    const useTeacherUpdate = () => {
        return useMutation({
            mutationFn: async ({data, id}: {data: TeachersType, id?: number}) => teacherService.updateTeacher(data, id!),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['teachers'] })
            }
        })
    }
    const useTeachersDelete = () => {
        return useMutation({
            mutationFn: async (id: number) => teacherService.deleteTeacher(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['teachers'] })
            }
        })
    }
    return { 
        data, 
        students,
        useTeacherCreate,
        useTeacherUpdate,
        useTeachersDelete,
    }
}