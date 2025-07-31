export interface CoursesType{
    id?: number;
    title: string;
    description: string;
    price: number;
    duration: number;
    lessons_in_a_week: number;
    lessons_in_a_month: number;
    lesson_duration: number;
};

export type TypeCourse = {
    id: number;
    title: string;
}