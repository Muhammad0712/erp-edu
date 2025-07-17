import * as yup from "yup";

export const groupFormSchema = yup.object().shape({
    name: yup.string().min(5).required('Name is required'),
    course_id: yup.number().required('Course is required'),
    start_date: yup.string().required('Start date is required'),
    end_date: yup.string().required('End date is required'),
    status: yup.string().required('Status is required'),
})

export const courseFormSchema = yup.object().shape({
    title: yup.string().min(5).required('Title is required'),
    description: yup.string().min(5).required('Description is required'),
    price: yup.number().required('Price is required'),
    duration: yup.string().required('Duration is required'),
    lessons_in_a_week: yup.number().required('Lessons in a week is required'),
    lesson_duration: yup.string().required('Lesson duration is required'),
})