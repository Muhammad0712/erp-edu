import type { LessonsType, StudentsType, TeachersType } from "@types"

export interface GroupsType {
    id?: number,
    name: string,
    courseId: number,
    start_date: string,
    start_time: string,
    status: string,
    roomId: number,
    course?: {
        id: number
    },
    lessons: [
        {
            room: {
                id: number
            }
        }
    ],
    room?: {
        id: number
    }
}

export interface GroupLessonsType {
    lessons: LessonsType[]
}

export interface GroupStudentsType {
    students: StudentsType[]
}

export interface GroupTeachersType {
    teachers: TeachersType[]
}

