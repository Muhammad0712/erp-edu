import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { coursesService } from "@service/courses.service";
import type { Course } from "@types";



const useCourses = () => {
    const queryClient = useQueryClient()
    const { data } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => coursesService.getAllCourses()
    });

    const useCoursesCreate = () => {
        return useMutation({
            mutationFn: async (data: Course) => coursesService.createCourse(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['courses'] })
            }
        })
    }

    const useCoursesUpdate = () => {
        return useMutation({
            mutationFn: async (data: Course) => {
                coursesService.updateCourse(data)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['courses'] })
            }
        })
    }

    const useCoursesDelete = () => {
        return useMutation({
            mutationFn: async (model: Course) => coursesService.deleteCourse(model),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['courses'] })
            }
        })

    }

    return {
        data,
        useCoursesCreate,
        useCoursesUpdate,
        useCoursesDelete
    }
}

export {
    useCourses
}