import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ParamsType, TeacherType } from "@types";
import { teacherService } from "@service/teachers.service";


export const useTeachers = (params?: ParamsType) => {
    const queryClient = useQueryClient()
    const { data } = useQuery({
        queryKey: ['teachers', params],
        queryFn: async () => teacherService.getTeachers(params)
    });
    const useTeacherCreate = () => {
        return useMutation({
            mutationFn: async (data: TeacherType) => teacherService.createTeacher(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['teachers'] })
            }
        })
    }
    const useTeacherUpdate = () => {
        return useMutation({
            mutationFn: async (data: TeacherType) => {
                teacherService.updateTeacher(data)
            },
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
        useTeacherCreate,
        useTeacherUpdate,
        useTeachersDelete,
    }
}