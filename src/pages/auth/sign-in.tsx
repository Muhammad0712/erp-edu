
import React, { useState, } from "react"
import { useNavigate } from "react-router-dom"
import { setItem } from "../../helpers"
import { Button, Input, Select, Space } from "antd"
import { useAuth } from "@hooks" 
import { ArrowRightOutlined, UserOutlined } from "@ant-design/icons"

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [role, setRole] = useState('admin')
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
      <div className="w-[100%] h-[100vh] flex items-center justify-center">
        <form className="w-[400px] h-[400px] flex flex-col justify-evenly items-center opacity-60 rounded-2xl transition-all hover:shadow-[15px_15px_30px_gray] shadow-[5px_5px_15px_gray] bg-gray-100"> 
            <h1 className="text-3xl font-bold text-black">Sign In</h1>
            <Input size="large" placeholder="Email. . ." prefix={<UserOutlined />} 
              style={{
                width: 310
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Space direction="horizontal">
              <Input.Password
                placeholder="Password. . ."
                size="large"
                visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button style={{ width: 80 }} onClick={() => setPasswordVisible((prevState) => !prevState)} size="large">
                {passwordVisible ? 'Hide' : 'Show'}
              </Button>
            </Space>
            <div className="w-[78%] flex items-center justify-between ">
              <Select
                  defaultValue="Admin"
                  style={{ width: 100, height: 38 }}
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
              <Button size="large" type="primary" onClick={submit}>Submit <ArrowRightOutlined /></Button>
            </div>
          </form>
      </div>
    </>
  )
}

export default SignIn

