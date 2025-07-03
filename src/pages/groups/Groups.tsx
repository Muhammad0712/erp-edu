import React, { useEffect, useState } from "react"
import { groupsService } from "../../service"
import type { Group } from "../../types/group";
import AddGroupModal from "@components/modals/add-group.modal";


const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  
  useEffect(()=> {
    const fetchGroups = async () => {
      const res = await groupsService.getGroups();
      if (!res) {
        return <p>Hech qanday guruh mavjud emas!</p>
      }
      setGroups(res.data.data)
    }
    fetchGroups()
  },[])
  
  return (
    <div className="w-[100%] flex flex-col items-center ">
      <div className="w-[700px] h-[50px] flex justify-between items-center">
        <h1>Groups</h1>
        {<AddGroupModal />}
      </div>
      <table className="w-[700px] text-left text-sm">
        <thead className=" text-gray-700 border-b">
          <tr className="flex">
            <th className="h-[40px] w-[20%] flex justify-center items-center">ID</th>
            <th className="h-[40px] w-[80%] flex items-center">Name</th>
          </tr>
        </thead>
        <tbody>
          {groups.map(group => (
            <tr key={group.id} className="hover:bg-black hover:opacity-50 hover:text-white flex">
              <td className="h-[40px] w-[20%] flex justify-center items-center ">{group.id}</td>
              <td className="h-[40px] w-[80%] flex items-center">{group.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Groups