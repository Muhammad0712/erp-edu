import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"

import App from "../App"
import { AdminLayout, Groups, NotFound, SignIn, SignUp, StudentLayout, TeacherLayout } from "@pages";
import LayOut from "../components/lay-out";
import SignInDatePicker from "../components/date-picker";


const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={ <App/> }>
                <Route index element={ < SignIn/> }/>
                <Route path="/sign-up" element={ <SignUp/> }/>
                <Route path="*" element={ <NotFound/> }/>
                {/* ADMIN LAYOUT */}
                <Route path="/admin" element={ <AdminLayout/> }>
                    <Route path="groups" element={ <Groups/> } />
                    <Route path="lay-out" element={ <LayOut/> } />
                    <Route path="date-picker" element={ <SignInDatePicker/> } />

                </Route>
                {/* TEACHER LAYOUT */}
                <Route path="/teacher" element={ <TeacherLayout/> }>

                </Route>
                {/* STUDENT LAYOUT */}
                <Route path="/student" element={ <StudentLayout/> }>

                </Route>
            </Route> 
        )
    )
    return <RouterProvider router={router} />;
}

export default Router