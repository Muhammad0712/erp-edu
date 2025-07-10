import { getItem } from '@helpers'
import { Navigate } from 'react-router-dom'
import type { Protect } from '@types'

const LoginProtected = ({children}: Protect) => {
    const accessToken = getItem('access_token')
    const role = getItem('role')
    if (accessToken) {
        return <Navigate to={`/${role}`} replace></Navigate>
    }
  return (
    <>
        {children}
    </>
  )
}

export default LoginProtected