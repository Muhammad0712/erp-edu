import { Button, Space, Table, type PaginationProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { useCourses } from '@hooks';
import CourseModal from './modals/course.modal';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { CourseColumns } from '@components';
import { useLocation } from 'react-router-dom';

const Courses = () => {
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

  const { data, useCoursesDelete } = useCourses(params)
  const { mutate: deleteFn } = useCoursesDelete()
  const courses = data?.data.courses;
  
  const handlePagination = (page: number, limit: number) => {
    setParams(() => ({
      page: page,
      limit: limit
    }))
  }

  const handleDelete = async (res: any) => {
    deleteFn(res, {
      onSuccess: () => { }
    })
  }

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const columns = [
    ...(CourseColumns ?? []),
    {
      title: 'Actions',
      key: 'actions',
      render: (_:any, record: any) => (
        <Space>
          <Button type="primary" onClick={() => showModal()}>
            <EditOutlined />
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-[100%] flex flex-col items-center">
      <div className="w-[100%] h-[40px] flex items-center justify-between">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Button type="primary"
          className="!border-2 !text-white !w-[120px] !h-[40px] !flex !items-center !justify-center !rounded-md"
          onClick={showModal}
        >
          + Add Course
        </Button>
      </div>
      <Table
        dataSource={courses}
        rowKey='id'
        columns={columns}
        pagination={false}
        onChange={(pagination: PaginationProps) => handlePagination(pagination.current!, pagination.pageSize!)}
        style={{
          width: "100%",
          marginTop: '10px'
        }}
      />
      <CourseModal
        setOpen={setOpen}
        open={open}
      />
    </div>
  )
}

export default Courses