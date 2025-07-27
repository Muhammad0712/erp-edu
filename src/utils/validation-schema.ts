import * as yup from "yup";

export const groupFormSchema = yup.object().shape({
    name: yup.string().min(5).required('Name is required'),
    course_id: yup.number().required('Course is required'),
    start_date: yup.string().required('Start date is required'),
    start_time: yup.string().required('Start time is required'),
    status: yup.string().required('Status is required'),
})

export const courseFormSchema = yup.object().shape({
    title: yup.string().min(5).required('Title is required'),
    description: yup.string().min(5).required('Description is required'),
    price: yup.number().required('Price is required'),
    duration: yup.string().required('Duration is required'),
    lessons_in_a_week: yup.number().required('Lessons in a week is required'),
    lesson_duration: yup.number().required('Lesson duration is required'),
})

export const teacherFormSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(5).required('Password is required'),
    phone: yup.string().required('Phone is required'),
    role: yup.string().required('Role is required'),
    branch_id: yup.number().required('Branch is required'),
});

export const signInSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(5).required('Password is required'),
    role: yup.string().required('Role is required'),
});