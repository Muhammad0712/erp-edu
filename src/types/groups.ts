import type { CoursesType } from "./courses";
import type { LessonsType } from "./lessons";

export interface GroupsType {
    id?: number,
    name: string,
    courseId: number,
    start_date: string,
    start_time: string,
    status?: string,
    roomId: number,
    course: CoursesType;
    lessons: LessonsType[]
}


