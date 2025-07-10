import { getItem } from "@helpers"
import { Navigate } from "react-router-dom";
import type { Protect } from "@types";

const LayoutProtected = ({children}: Protect) => {
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
