import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { branchesService } from "@service/branches.service";
import type { BranchesType, ParamsType } from "@types";



const useBranches = (params?: ParamsType) => {
    const queryClient = useQueryClient()
    const { data } = useQuery({
        queryKey: ['branches', params],
        queryFn: async () => branchesService.getAllBranches(params)
    });

    const useBranchesCreate = () => {
        return useMutation({
            mutationFn: async (data: BranchesType) => branchesService.createBranch(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['branches'] })
            }
        })
    }

    const useBranchesUpdate = () => {
        return useMutation({
            mutationFn: async ({data, id}: {data: BranchesType, id: number}) => branchesService.updateBranch(data, id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['branches'] })
            }
        })
    }

    const useBranchesDelete = () => {
        return useMutation({
            mutationFn: async (id: number) => branchesService.deleteBranch(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['branches'] })
            }
        })

    }

    return {
        data,
        useBranchesCreate,
        useBranchesUpdate,
        useBranchesDelete
    }
}

export {
    useBranches
}