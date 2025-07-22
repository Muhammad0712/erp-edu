import { getItem } from "@helpers"
import { Navigate } from "react-router-dom";
import type { ProtectedRoute } from "../../types";

const LayoutProtected = ({children}: ProtectedRoute) => {
    const accessToken = getItem('access_token');
    if (!accessToken) {
        return <Navigate to='/' replace/>
    }
    return (
        <>
            {children}
        </>
    )
}

export default LayoutProtected
