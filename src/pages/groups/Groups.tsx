import { useEffect, useState } from "react"
import { groupsService } from "@service/groups.service"
import AddGroupModal from "./modals/add-group.modal";
import { Notification } from "../../helpers";
import { Table, type PaginationProps } from "antd";
import UpdateGroupModal from "./modals/update-group.modal";


const Groups = () => {
  const [current, setCurrent] = useState(1);
  const pageSize = 6;
  const [data, setData] = useState([]);

  const paginatedData = data.slice((current - 1) * pageSize, current * pageSize);
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
      render: (text, record) => (
        <div className="flex gap-2">
          {<UpdateGroupModal onSuccess={fetchGroups}/>}
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-[60px] h-[30px]"
            onClick={() => handleDelete(record)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

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


  const handleDelete = async(id: number)=> {
    const res = await groupsService.deleteGroupById(id);
    if (res?.status === 200) {
      Notification('success', "Guruh muvaffaqiyatli o'chirildi")
    }
    setData(prev => prev.filter(group => group.id !== id));
  }
  
  return (
    <div className="w-[100%] flex flex-col items-center">
      <div className="w-[100%] h-[50px] flex justify-end items-center">
        {<AddGroupModal onSuccess={fetchGroups}/>}
      </div>
      <Table
        dataSource={paginatedData}
        columns={columns}
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