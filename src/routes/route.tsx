import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "../App";
import {
    AdminLayout,
    Groups,
    LoginProtected,
    NotFound,
    SignIn,
    SignUp,
    SingleGroup,
    StudentLayout,
    TeacherLayout
} from "@pages";
import { LayoutProtected, Courses } from '@pages';

const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App />}>
                <Route index element={<LoginProtected><SignIn /></LoginProtected>} />
                <Route path="/sign-up" element={<SignUp />} />

                {/* ADMIN LAYOUT */}
                <Route path="/admin" element={<LayoutProtected><AdminLayout /></LayoutProtected>}>
                    <Route index path="groups" element={<Groups />} />
                    <Route path="groups/:id" element={<SingleGroup />} />
                    <Route path="courses" element={<Courses />} />
                    <Route path="students" element={<div>Students sahifa</div>} />
                    <Route path="teachers" element={<div>Teachers sahifa</div>} />
                </Route>

                {/* TEACHER LAYOUT */}
                <Route path="/teacher" element={<TeacherLayout />}>
                    <Route index element={<div>Teacher Dashboard</div>} />
                </Route>

                {/* STUDENT LAYOUT */}
                <Route path="/student" element={<StudentLayout />}>
                    <Route index element={<div>Student Dashboard</div>} />
                </Route>

                {/* 404 PAGE */}
                <Route path="*" element={<NotFound />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default Router;