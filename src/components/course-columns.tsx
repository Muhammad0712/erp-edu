import type { ColumnsType } from "antd/es/table";
import type { Course } from "@types";

export const CourseColumns: ColumnsType<Course> = [
    {
        title: 'Title',
            dataIndex: 'title',
                key: 'title',
    },
    {
        title: 'Price',
            dataIndex: 'price',
                key: 'price',
    },
    {
        title: 'Duration',
            dataIndex: 'duration',
                key: 'duration',
    },
    {
        title: 'Lessons in a week',
            dataIndex: 'lessons_in_a_week',
                key: 'lessons_in_a_week',
    },
    {
        title: 'Lesson_duration',
            dataIndex: 'lesson_duration',
                key: 'lesson_duration',
    },
]
