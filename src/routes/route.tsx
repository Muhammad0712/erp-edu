import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import App from "../App";
import {
    GroupStudents,
    LayoutProtected,
    LoginProtected,
    TeacherGroups,
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
    Rooms
} from "@pages";
const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>


                <Route path="/" element={

                    <App />

                }>
                    <Route index element={<LoginProtected><SignIn /></LoginProtected>} />
                    {/* ADMIN LAYOUT */}
                    <Route path="/admin" element={<LayoutProtected><AdminLayout /></LayoutProtected>}>
                        <Route index element={<Groups />} />
                        <Route path="groups/:id" element={<SingleGroup />} />
                        <Route path="courses" element={<Courses />} />
                        <Route path="students" element={<Students />} />
                        <Route path="teachers" element={<Teachers />} />
                        <Route path="branches" element={<Branches />} />
                        <Route path="rooms" element={<Rooms />} />
                    </Route>

                    {/* TEACHER LAYOUT */}
                    <Route path="/teacher" element={<TeacherLayout />}>
                        <Route index element={<TeacherGroups />} />
                        <Route path="group-students/:id" element={<GroupStudents />} />
                    </Route>

                    {/* STUDENT LAYOUT */}
                    <Route path="/students" element={<div>Students</div>}>
                        <Route element={<div>Student Dashboard</div>} />
                    </Route>

                    {/* 404 PAGE */}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </>
        )
    );

    return <RouterProvider router={router} />;
};

export default Router;