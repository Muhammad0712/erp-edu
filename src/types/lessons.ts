import type { RoomsType } from "./rooms";

export interface LessonsType {
    id?: number;
    title: string;
    notes: string;
    date: string;
    status: string;
    groupId: number;
    roomId: number;
    room: RoomsType;
}