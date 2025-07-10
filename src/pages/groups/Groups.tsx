import { useState } from "react"
import { Button, Table, type PaginationProps } from "antd";
import { useGroup } from "@hooks/useGroups";
import AddGroupModal from "./modals/add-group.modal";



const Groups = () => {
  const { useGroupDelete } = useGroup();
  const { mutate: deleteFn } = useGroupDelete();
  const { data } = useGroup();
  const resData = data?.data?.data ?? [];
  // --------------------PAGINATION--------------------
  const [current, setCurrent] = useState(1);
  const pageSize = 6;
  const paginatedData = (resData ?? []).slice((current - 1) * pageSize, current * pageSize);


    const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
    };
  

  const onChange: PaginationProps['onChange'] = (page) => {
    console.log('Sahifa:', page);
    setCurrent(page);
  };
  // --------------------------------------------------

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
          <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-[60px] h-[30px]" onClick={showModal}>Update</button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-[60px] h-[30px]"
            onClick={() => handleDelete(res)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = async (res: any) => {
    deleteFn(res, {
      onSuccess: () => { }
    })
  }

  return (
    <div className="w-[100%] flex flex-col items-center">
      <div className="w-[100%] h-[40px] flex items-center justify-between">
        <h1 className="text-2xl font-bold">Groups</h1>

        <Button type="primary"
          className="!border-2 !text-white !w-[120px] !h-[40px] !flex !items-center !justify-center !rounded-md !bg-[green]"
          onClick={showModal}
        >
          + Add Group
        </Button>
        {open && <AddGroupModal setOpen={setOpen} showModal={showModal} open={open}/>}

      </div>
      <Table
        dataSource={paginatedData}
        columns={columns}
        rowKey='id'
        pagination={{
          current,
          pageSize,
          total: resData?.length ?? 0,
          onChange,
        }}
        style={{
          width: "100%",
          marginTop: '10px'
        }}
      />

    </div>
  )
}

export default Groups