import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { studentsService } from "@service/students.service"
import type { ParamsType, StudentsType } from "@types";


export const useStudent = (params?: ParamsType) => {
    const queryClient = useQueryClient()
    const { data } = useQuery({
        queryKey: ['students', params],
        queryFn: async () => studentsService.getStudents(params)
    });

    const useStudentCreate = () => {
        return useMutation({
            mutationFn: async (data: StudentsType) => {
                console.log(data);
                return studentsService.createStudent(data)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['groups'] })
            }
        })
    }
    const useStudentUpdate = () => {
        return useMutation({
            mutationFn: async ({ data, id }: { data: StudentsType, id: number }) => studentsService.updateStudent(data, id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['students'] })
            }
        })
    }
    const useStudentDelete = () => {
        return useMutation({
            mutationFn: async (id: number) => studentsService.deleteStudent(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['students'] })
            }
        })
    }
    return {
        data,
        useStudentCreate,
        useStudentUpdate,
        useStudentDelete
    }
}
