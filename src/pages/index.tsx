import { lazy } from "react";

const SignIn = lazy(() => import('./auth/sign-in'))
const SignUp = lazy(() => import('./auth/sign-up'))
const AdminLayout = lazy(() => import('./admin-layout/admin-layout'))
const Students = lazy(() => import('./students/students'))
const TeacherLayout = lazy(() => import('./teacher-layout/teacher-layout'))
const Groups = lazy(() => import('./groups/groups'))
const SingleGroup = lazy(() => import('./groups/single-group'))
const NotFound = lazy(() => import('./not-found/not-found'));
const LayoutProtected = lazy(() => import('./protected-routes/admin-layout-protected'))
const LoginProtected = lazy(() => import('./protected-routes/login-protected'))
const Courses = lazy(() => import('./courses/courses'))
const Teachers = lazy(()=> import('./teachers/teachers'))
const Branches = lazy(()=> import('./branches/branches'))

export { SignIn, SignUp, AdminLayout, Students, TeacherLayout, Groups, NotFound, LayoutProtected, LoginProtected, Courses, SingleGroup, Teachers, Branches }
