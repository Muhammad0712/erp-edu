import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "../App";
import {
    LayoutProtected,
    LoginProtected,
    TeacherLayout,
    AdminLayout,
    SingleGroup,
    Students,
    NotFound,
    Teachers,
    Branches,
    Courses,
    Groups,
    SignIn,
    SignUp,
    Rooms
} from "@pages";
const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
                <Route path="/" element={<App />}>
                    <Route index element={<LoginProtected><SignIn /></LoginProtected>} />
                    <Route path="/sign-up" element={<SignUp />} />

                    {/* ADMIN LAYOUT */}
                    <Route path="/admin" element={<LayoutProtected><AdminLayout /></LayoutProtected>}>
                        <Route index element={<Groups />} />
                        <Route path="groups/:id" element={<SingleGroup />} />
                        <Route path="courses" element={<Courses />} />
                        <Route path="students" element={<Students />} />
                        <Route path="teachers" element={<Teachers/>} />
                        <Route path="branches" element={<Branches/>} /> 
                        <Route path="rooms" element={<Rooms/>} />
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