import { lazy } from "react";

const SignIn = lazy(()=> import('./auth/sign-in'))
const SignUp = lazy(()=> import('./auth/sign-up'))
const AdminLayout = lazy(()=> import('./admin-layout/admin-layout'))
const StudentLayout = lazy(()=> import('./student-layout/student-layout'))
const TeacherLayout = lazy(()=> import('./teacher-layout/teacher-layout'))
const Groups = lazy(()=> import('./groups/groups'))
const NotFound = lazy(()=> import('./not-found/not-found'))


export {SignIn, SignUp, AdminLayout, StudentLayout, TeacherLayout, Groups, NotFound}