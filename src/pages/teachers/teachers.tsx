import type { TeacherType } from "@types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGeneral, useTeachers } from "@hooks";
import { Button, Space, Table, type TablePaginationConfig } from "antd";
import { PopConfirm, TeacherColumns } from "@components";
import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import TeacherModal from "./modals/teacher.modal";


const Teachers = () => {
  const [update, setUpdate] = useState<TeacherType | null>(null);
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    limit: 10
  });
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    if (page && limit) {
      setParams(() => ({
        page: Number(page),
        limit: Number(limit)
      }))
    }
  }, [location.search]);
  const { data, useTeachersDelete } = useTeachers(params);
  console.log(data);
  
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useTeachersDelete();
  const deleteItem = async (id: number) => {
    console.log(id);
    deleteFn(id);
  }
  const editItem = (record: TeacherType) => {
    setUpdate(record);
    setOpen(true);
  }
  const toggle = () => {
    setOpen(!open);
    if (update) {
      setUpdate(null)
    }
  }
  const handleTableChange = (pagination: TablePaginationConfig) => {
    handlePagination({ pagination, setParams });
  }
  const columns = [
    ...(TeacherColumns ?? []),
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: TeacherType) => (
        <>
          <Space>
            <Button type="primary" onClick={() => editItem(record)}>
              <EditOutlined />
            </Button>
            {<PopConfirm handleDelete={() => deleteItem(record.id!)} loading={isDeleting} />}
          </Space>
        </>
      )
    }
  ]
  return (
    <>
      <div className="w-[100%] flex flex-col items-center">
        <div className="w-[100%] h-[40px] flex items-center justify-between">
          <h1 className="text-3xl font-bold">Teachers</h1>
          <Button 
            type="primary" 
            onClick={toggle}
            icon={<UserAddOutlined />}
          >
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data?.data.teachers}
          rowKey={(row)=> row.id!}
          pagination={{
            current: params.page,
            pageSize: params.limit,
            total: data?.data.total,
            showSizeChanger: true,
            pageSizeOptions: ['4', '5', '6', '7', '10'],
          }}
          onRow={(record) => {
            return {
              title: record.first_name
            }
          }}
          onChange={handleTableChange}
          style={{
            width: '100%',
            marginTop: '10px'
          }}
        />
        {open && <TeacherModal 
          open={open}
          toggle={toggle} 
          update={update} 
        />}
      </div>
    </>
  )
}

export default Teachers