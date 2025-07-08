
import React, { useState, } from "react"
import { useNavigate } from "react-router-dom"
import { setItem } from "../../helpers"
import { Select } from "antd"
import { useAuth } from "@hooks/use-auth" 

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const navigate = useNavigate()
  const { mutate } = useAuth()

  const submit = async(e: React.MouseEvent<HTMLElement>)=> {
    e.preventDefault()
    const payload = {email, password}
    mutate(
      { data: payload, role },
      {
        onSuccess: (res: any)=> {
          if (res.status === 201) {
            setItem('access_token', res.data.access_token)
            setItem('role', role)
            navigate(`${role}`)
          }
        }
      }
    )
  }
  return (
    <>
      <div className="w-[100%] h-[100vh] flex items-center justify-center ">
          <form className="w-[400px] h-[300px] flex flex-col justify-evenly items-center bg-black opacity-60 rounded-2xl"> 
            <h1 className="text-4xl font-bold text-white">Sign In</h1>
            <input type="email" placeholder="Email..." className="w-[90%] h-[40px] text-xl text-white bg-transparent outline-none" onChange={(e)=> setEmail(e.target.value) }/>
            <input type="password" placeholder="Password..." className="w-[90%] h-[40px] text-xl text-white bg-transparent outline-none " onChange={(e)=> setPassword(e.target.value)}/>
            <Select
              defaultValue="Admin"
              style={{ width: 200 }}
              onChange={(value)=> setRole(value)}
              options={[
                {
                  label: <span>Admin</span>,
                  title: 'Admins',
                  options: [
                    { label: <span>Admin</span>, value: 'admin' },
                  ],
                },
                {
                  label: <span>Others</span>,
                  title: 'others',
                  options: [
                    { label: <span>Teachers</span>, value: 'teacher' },
                    { label: <span>Students</span>, value: 'student' },
                    { label: <span>Lids</span>, value: 'lids' },
                  ],
                },
              ]}
            />
            <button className="border w-[100px] h-[40px] opacity-100 text-white rounded-md" onClick={submit}>Submit</button>
          </form>
      </div>
    </>
  )
}

export default SignIn

