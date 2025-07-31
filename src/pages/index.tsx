import { lazy } from "react";

const LayoutProtected = lazy(() => import('./protected-routes/admin-layout-protected'));
const LoginProtected = lazy(() => import('./protected-routes/login-protected'));
const TeacherLayout = lazy(() => import('./teacher-layout/teacher-layout'));
const AdminLayout = lazy(() => import('./admin-layout/admin-layout'));
const SingleGroup = lazy(() => import('./groups/single-group'));
const NotFound = lazy(() => import('./not-found/not-found'));
const Students = lazy(() => import('./students/students'));
const Branches = lazy(() => import('./branches/branches'));
const Teachers = lazy(() => import('./teachers/teachers'));
const Courses = lazy(() => import('./courses/courses'));
const Groups = lazy(() => import('./groups/erp-groups'));
const SignIn = lazy(() => import('./auth/sign-in'));
const Rooms = lazy(() => import('./rooms/rooms'));
const Profile = lazy(() => import('./profile/profile'));
const TeacherGroups = lazy(() => import('./teacher-groups/teacher-groups'));
const GroupStudents = lazy(() => import('./teacher-groups/group-students'));

// Lazy loading modals
const StudentsModal = lazy(() => import('./students/modals/students-modal'));
const TeachersModal = lazy(() => import('./teachers/modals/teacher.modal'));

export {
    // Layouts
    LayoutProtected,
    LoginProtected,
    TeacherLayout,
    TeacherGroups,
    GroupStudents,
    AdminLayout,
    SingleGroup,
    Teachers,
    Students,
    NotFound,
    Branches,
    Courses,
    Profile,
    SignIn,
    Groups,
    Rooms,
    // Modals
    StudentsModal,
    TeachersModal,
}
