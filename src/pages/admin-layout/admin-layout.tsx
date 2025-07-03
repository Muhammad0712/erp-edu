import { Outlet, useNavigate } from "react-router-dom"

const AdminLayout = () => {
  const navigate = useNavigate()
  const role = localStorage.getItem('role')
  const throwGroupsPage = () => {
    navigate(`/${role}/groups`);
    return
  }
  return (
    <div className="w-[100%] h-[100vh] ">
      <header className="w-[100%] h-[60px] flex justify-center items-center">
        <ul className="w-[400px] h-[30px] flex ">
          <li className="w-[25%] flex items-center justify-center hover:text-white cursor-pointer hover:bg-black hover:opacity-50">Teachers</li>
          <li className="w-[25%] flex items-center justify-center hover:text-white cursor-pointer hover:bg-black hover:opacity-50">Students</li>
          <li className="w-[25%] flex items-center justify-center hover:text-white cursor-pointer hover:bg-black hover:opacity-50" onClick={throwGroupsPage}>Groups</li>
          <li className="w-[25%] flex items-center justify-center hover:text-white cursor-pointer hover:bg-black hover:opacity-50">Lids</li>
        </ul>
      </header>
      
      <Outlet/>
    </div>
  )
}

export default AdminLayout