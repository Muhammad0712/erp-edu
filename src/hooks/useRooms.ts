import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { roomsService } from "@service/rooms.service";
import type { RoomsType, ParamsType } from "@types";



const useRooms = (params?: ParamsType) => {
    const queryClient = useQueryClient()
    const { data } = useQuery({
        queryKey: ['rooms', params],
        queryFn: async () => roomsService.getAllRooms(params)
    });

    const useRoomsCreate = () => {
        return useMutation({
            mutationFn: async (data: RoomsType) => roomsService.createRoom(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['rooms'] })
            }
        })
    }

    const useRoomsUpdate = () => {
        return useMutation({
            mutationFn: async ({data, id}: {data: RoomsType, id: number}) =>  roomsService.updateRoom(data, id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['rooms'] })
            }
        })
    }

    const useRoomsDelete = () => {
        return useMutation({
            mutationFn: async (id: number) => roomsService.deleteRoom(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['rooms'] })
            }
        })

    }

    return {
        data,
        useRoomsCreate,
        useRoomsUpdate,
        useRoomsDelete
    }
}

export {
    useRooms
}