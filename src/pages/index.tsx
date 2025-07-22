import { lazy } from "react";

const LayoutProtected = lazy(() => import('./protected-routes/admin-layout-protected.tsx'))
const LoginProtected = lazy(() => import('./protected-routes/login-protected.tsx'))
const TeacherLayout = lazy(() => import('./teacher-layout/teacher-layout.tsx'))
const AdminLayout = lazy(() => import('./admin-layout/admin-layout.tsx'))
const SingleGroup = lazy(() => import('./groups/single-group.tsx'))
const NotFound = lazy(() => import('./not-found/not-found.tsx'));
const Students = lazy(() => import('./students/students.tsx'))
const Branches = lazy(() => import('./branches/branches.tsx'))
const Teachers = lazy(() => import('./teachers/teachers.tsx'))
const Courses = lazy(() => import('./courses/courses.tsx'))
const Groups = lazy(() => import('./groups/groups.tsx'))
const SignIn = lazy(() => import('./auth/sign-in.tsx'))
const SignUp = lazy(() => import('./auth/sign-up.tsx'))
const Rooms = lazy(() => import('./rooms/rooms.tsx'));

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
