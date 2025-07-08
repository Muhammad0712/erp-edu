import { useEffect, useState } from "react"
import { groupsService } from "@service/groups.service"
import AddGroupModal from "./modals/add-group.modal";
import { Notification } from "../../helpers";
import { Table, type PaginationProps } from "antd";
import UpdateGroupModal from "./modals/update-group.modal";
import useGroup from "../../hooks/useGroups";


const Groups = () => {
  type Groups = {
    id: number
  }
  const [current, setCurrent] = useState(1);
  const pageSize = 6;
  const [data, setData] = useState<Groups[]>([]);
  const { useGroupDelete } = useGroup();
  const { mutate: deleteFn } = useGroupDelete();

  const paginatedData = data.slice((current - 1) * pageSize, current * pageSize);
  

  const onChange: PaginationProps['onChange'] = (page) => {
    console.log('Sahifa:', page);
    setCurrent(page);
  };

  const fetchGroups = async () => {
    const res = await groupsService.getGroups();
    if (!res) {
      console.log("Hech qanday guruh mavjud emas!");
      return;
    }
    setData(res.data.data);
  };

  
  useEffect(() => { 
    fetchGroups();
  }, []);

  const columns = [
    {
      title: 'Group Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Course',
      dataIndex: 'course_id',
      key: 'course_id',
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (res: any) => (
        <div className="flex gap-2">
          {<UpdateGroupModal onSuccess={fetchGroups} group={data}/>}
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-[60px] h-[30px]"
            onClick={()=> handleDelete(res.id, res)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  
  const handleDelete = async( id: number, res={})=> {
    console.log(res);
    
    deleteFn(id, {onSuccess: ()=> {
      Notification('success', "Guruh muvaffaqiyatli o'chirildi!")
    }})  
  }
  
  return (
    <div className="w-[100%] flex flex-col items-center">
      <div className="w-[100%] h-[50px] flex justify-end items-center">
        {<AddGroupModal fetchGroups={fetchGroups}/>}
      </div>
      <Table
        dataSource={paginatedData}
        columns={columns}
        rowKey='id'
        pagination={{
          current,
          pageSize,
          total: data.length,
          onChange,
        }}
        style={{
          width: "100%"
        }}
      />

    </div>
  )
}

export default Groups