import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import App from "../App"
import { AdminLayout, Groups, LoginProtected, NotFound, SignIn, SignUp, StudentLayout, TeacherLayout } from "@pages";
import {LayoutProtected} from '@pages'
import Courses from "../pages/courses/courses";


const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={ <App/> }>
                <Route index element={<LoginProtected>< SignIn /></LoginProtected> }/>
                <Route path="/sign-up" element={ <SignUp/> }/>
                {/* ADMIN LAYOUT */}
                <Route path="/admin" element={<LayoutProtected><AdminLayout/></LayoutProtected> }>
                    <Route index path="groups" element={ <Groups/> } />
                    <Route path="courses" element={ <Courses/> } />
                    <Route path="students" element={ <Groups/> } />
                    <Route path="teachers" element={ <Groups/> } />
                </Route>
                <Route path="/teacher" element={ <TeacherLayout/> }>
                
                </Route>
                <Route path="/student" element={ <StudentLayout/> }>

                </Route>
                <Route path="*" element={ <NotFound/> }/>
            </Route> 
        )
    )
    return <RouterProvider router={router} />;
}

export default Router