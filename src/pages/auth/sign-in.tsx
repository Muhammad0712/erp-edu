
import { useState } from "react"
import { authService } from "@service"
import { useNavigate } from "react-router-dom"
import { setItem } from "../../helpers"
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// const validationSchema = Yup.object().shape({
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Please enter your email"),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Please enter your password")
// });

// const initialValues = {
//   email: "",
//   password: ""
// };

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const navigate = useNavigate()

  const submit = async()=> {
    const payload = {email, password}
    const res = await authService.signIn(payload, role)
    if (res.status === '201') {
      setItem('access_token', res.data.access_token);
      setItem("role", role)
      navigate(`/${role}`)
    }
  }
  return (
    <>
    {/* <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      <Form className="w-[100%] h-[100vh] flex items-center justify-center flex-col">
        
        <div>
          <label>Email:</label>
          <Field name="email" placeholder="Email"/>
          <ErrorMessage name="email" component="div" className="text-red-700" />
        </div>
        <div>
          <label>Password:</label>
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" className="text-red-700" />
        </div>
        <select name="" id="">
          
        </select>
        <button type="submit">Submit</button>
      </Form>
    </Formik> */}
      <div className="w-[100%] h-[100vh] flex items-center justify-center ">
          <form className="w-[400px] h-[300px] flex flex-col justify-evenly items-center bg-black opacity-60 rounded-2xl"> 
            <h1 className="text-4xl font-bold text-white">Sign In</h1>
            <input type="email" placeholder="Email..." className="w-[90%] h-[40px] text-xl text-white bg-transparent outline-none" onChange={(e)=> setEmail(e.target.value) }/>
            <input type="password" placeholder="Password..." className="w-[90%] h-[40px] text-xl text-white bg-transparent outline-none " onChange={(e)=> setPassword(e.target.value)}/>
              <select className="text-white outline-none" onChange={(e)=> setRole(e.target.value)}>
                <option value="teacher" className="text-black">Teacher</option>
                <option value="student" className="text-black">Student</option>
                <option value="admin" className="text-black">Admin</option>
                <option value="lid" className="text-black">Lid</option>
              </select>
            <button className="border w-[100px] h-[40px] opacity-100 text-white rounded-md" onClick={submit}>Submit</button>
          </form>
      </div>
    </>
  )
}

export default SignIn

