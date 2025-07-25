export interface Course{
    id?: number;
    title: string;
    description: string;
    price: number;
    duration: string;
    lessons_in_a_week: number;
    lesson_duration: number;
};

export type TypeCourse = {
    id: number;
    title: string;
}