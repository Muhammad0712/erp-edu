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
    Students,
    TeacherLayout,
    LayoutProtected,
    Courses,
    Teachers,
    Branches
} from "@pages";

const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App />}>
                <Route index element={<LoginProtected><SignIn /></LoginProtected>} />
                <Route path="/sign-up" element={<SignUp />} />

                {/* ADMIN LAYOUT */}
                <Route path="/admin" element={<LayoutProtected><AdminLayout /></LayoutProtected>}>
                    <Route index element={<Groups />} path="groups" />
                    <Route path="groups/:id" element={<SingleGroup />} />
                    <Route path="courses" element={<Courses />} />
                    <Route path="students" element={<Students />} />
                    <Route path="teachers" element={<Teachers/>} />
                    <Route path="branches" element={<Branches/>} /> 
                </Route>

                {/* TEACHER LAYOUT */}
                <Route path="/teacher" element={<TeacherLayout />}>
                    <Route element={<div>Teacher Dashboard</div>} />
                </Route>

                {/* STUDENT LAYOUT */}
                <Route path="/students" element={<div>Students</div>}>
                    <Route element={<div>Student Dashboard</div>} />
                </Route>

                {/* 404 PAGE */}
                <Route path="*" element={<NotFound />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default Router;