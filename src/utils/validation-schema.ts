import * as yup from "yup";

export const groupFormSchema = yup.object().shape({
    name: yup.string().min(2).required('Name is required'),
    courseId: yup.number().required('Course is required'),
    start_date: yup.string().required('Start date is required'),
    start_time: yup.string().required('Start time is required'),
    status: yup.string().required('Status is required'),
    roomId: yup.number().required('Room is required'),
})

export const courseFormSchema = yup.object().shape({
    title: yup.string().min(2).required('Title is required'),
    description: yup.string().required('Description is required'),
    price: yup.number().required('Price is required'),
    duration: yup.number().required('Duration is required'),
    lessons_in_a_week: yup.number().required('Lessons in a week is required'),
    lessons_in_a_month: yup.number().required('Lessons in a month is required'),
    lesson_duration: yup.number().required('Lesson duration is required'),
})

export const teacherFormSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    email: yup.string().email().required('Email is required'), 
    password: yup.string().optional(),
    phone: yup.string().required('Phone is required'),
    role: yup.string().required('Role is required'),
    branchId: yup.array().of(yup.number()).min(1, 'At least one branch is required'),
});

export const signInSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(5).required('Password is required'),
    role: yup.string().required('Role is required'),
});

export const branchFormSchema = yup.object().shape({
    name: yup.string().min(2).required('Name is required'),
    address: yup.string().min(5).required('Address is required'),
    call_number: yup.string().min(5).required('Call number is required'),
});

export const roomFormSchema = yup.object().shape({
    branchId: yup.number().required('Branch is required'),
    name: yup.string().min(2).required('Name is required'),
    capacity: yup.number().min(1).required('Capacity is required'),
});

export const studentFormSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    email: yup.string().email().required('Email is required'), 
    password: yup.string().optional(),
    phone: yup.string().required('Phone is required'),
    role: yup.string().required('Role is required'),
    branchId: yup.number().required('Branch is required'),
});

export const teacherRelationFormSchema = yup.object().shape({
    start_date: yup.string().required('Start date is required'),
    teacherId: yup.number().required('Teacher is required'),
    groupId: yup.number().required('Group is required'),
});