import { Button, Space, Table, type TablePaginationConfig } from 'antd';
import { PopConfirm, StudentsColumns } from '@components';
import { EditOutlined } from '@ant-design/icons';
import { useGeneral, useGroup } from '@hooks';
import { useParams } from 'react-router-dom';
import type { StudentsType } from '@types';
import { useState } from 'react';


const SingleGroup = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<StudentsType | null>(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10
  });
  const { id } = useParams();

  const { students } = useGroup(params, +id!);
  const allStudents = students?.data?.group.students;

  const handleTableChange = (pagination: TablePaginationConfig) => {
    handlePagination({ pagination, setParams })
  }
  const { handlePagination } = useGeneral();

  const deleteItem = (id: number) => {
    console.log(id);
    // deleteFn(id);
  }
  const editItem = (record: StudentsType) => {
    setUpdate(record);
    setOpen(true);
  }
  // const toggle = () => {
  //   setOpen(!open);
  //   if (update) {
  //     setUpdate(null)
  //   }
  // }

  const columns = [
    ...(StudentsColumns ?? []),
    {
      title: "Action",
      key: "action",
      render: (_: any, record: StudentsType) => (
        <>
          <Space size={"middle"}>
            <Button type="primary" onClick={() => editItem(record)}>
              <EditOutlined />
            </Button>
            {<PopConfirm handleDelete={() => deleteItem(record.id!)} />}
          </Space>
        </>
      )
    }
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={allStudents}
        rowKey={(row) => row.id!}
        pagination={{
          current: params.page, 
          pageSize: params.limit,
          total: allStudents?.length,
          showSizeChanger: true,
          pageSizeOptions: ["4", "5", "6", "7", "10"],
        }}
        style={{
          width: "100%",
        }}
        onChange={handleTableChange}
      />
    </>
  )
}

export default SingleGroup