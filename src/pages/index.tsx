import { lazy } from "react";

const LayoutProtected = lazy(() => import('./protected-routes/admin-layout-protected'))
const LoginProtected = lazy(() => import('./protected-routes/login-protected'))
const TeacherLayout = lazy(() => import('./teacher-layout/teacher-layout'))
const AdminLayout = lazy(() => import('./admin-layout/admin-layout'))
const SingleGroup = lazy(() => import('./groups/single-group'))
const NotFound = lazy(() => import('./not-found/not-found'));
const Students = lazy(() => import('./students/students'))
const Branches = lazy(()=> import('./branches/branches'))
const Teachers = lazy(()=> import('./teachers/teachers'))
const Courses = lazy(() => import('./courses/courses'))
const Groups = lazy(() => import('./groups/groups'))
const SignIn = lazy(() => import('./auth/sign-in'))
const SignUp = lazy(() => import('./auth/sign-up'))
const Rooms = lazy(()=> import('./rooms/rooms'));

export { 
    LayoutProtected, 
    LoginProtected, 
    TeacherLayout, 
    AdminLayout, 
    SingleGroup, 
    Teachers, 
    Students, 
    NotFound, 
    Branches,
    Courses, 
    SignIn, 
    SignUp, 
    Groups, 
    Rooms
}
