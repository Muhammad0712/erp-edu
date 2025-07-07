import { useEffect, useState } from "react"
import { groupsService } from "@service/groups.service"
import type { Group } from "../../types/group";
import AddGroupModal from "./modals/add-group.modal";
import UpdateGroupModal from "./modals/update-group.modal";


const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  const fetchGroups = async () => {
    const res = await groupsService.getGroups();
    if (!res) {
      console.log("Hech qanday guruh mavjud emas!");
      return;
    }
    setGroups(res.data.data);
  };
  
  useEffect(() => {
    fetchGroups();
  }, []);


  const handleDelete = async(id: any)=> {
    await groupsService.deleteGroupById(id);
    setGroups(prev => prev.filter(group => group.id !== id));
  }
  
  
  return (
    <div className="w-[100%] flex flex-col items-center">
      <div className="w-[1100px] h-[50px] flex justify-between items-center">
        <h1 className="text-2xl font-bold">Groups</h1>
        {<AddGroupModal onSuccess={fetchGroups}/>}
      </div>
      <table className="w-[1100px] text-left text-sm">
        <thead className=" text-gray-700 border-b">
          <tr className="flex justify-between">
            <th className="h-[40px] w-[157px] flex justify-center items-center">ID</th>
            <th className="h-[40px] w-[157px] flex justify-center items-center">Name</th>
            <th className="h-[40px] w-[157px] flex justify-center items-center">Course Id</th>
            <th className="h-[40px] w-[157px] flex justify-center items-center">Start Date</th>
            <th className="h-[40px] w-[157px] flex justify-center items-center">End Date</th>
            <th className="h-[40px] w-[157px] flex justify-center items-center">Status</th>
            <th className="h-[40px] w-[157px] flex justify-center items-center">Update / Delete</th>
          </tr>
        </thead>
        <tbody>
          {groups.map(group => (
            <tr key={group.id} className="flex">
              <td className="h-[40px] w-[157px] flex items-center justify-center">{group.id}</td>
              <td className="h-[40px] w-[157px] flex items-center">{group.name}</td>
              <td className="h-[40px] w-[157px] flex items-center justify-center">{group.course_id}</td>
              <td className="h-[40px] w-[157px] flex items-center justify-center">{String(group.start_date)}</td>
              <td className="h-[40px] w-[157px] flex items-center justify-center">{String(group.end_date)}</td>
              <td className="h-[40px] w-[157px] flex items-center justify-center">{group.status}</td>
              <td className="h-[40px] w-[157px] flex items-center justify-around">
                {<UpdateGroupModal id={group.id} onSuccess={fetchGroups}/>}
                <button className="w-[60px] h-[30px] border rounded-md cursor-pointer" onClick={() => handleDelete(group.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Groups