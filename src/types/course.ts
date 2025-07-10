export interface Course{
    id?: number;
    title: string;
    description: string;
    price: number;
    duration: string;
    lesson_in_a_week: number;
    lesson_duration: string;
};

export type TypeCourse = {
    id: number;
    title: string;
}