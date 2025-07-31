import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tooltip, type TablePaginationConfig } from 'antd';
import CourseModal from './modals/course.modal';
import { useCourses, useGeneral } from '@hooks';
import { useLocation } from 'react-router-dom';
import { CourseColumns, PopConfirm } from '@components';
import { useEffect, useState } from 'react';
import type { CoursesType } from '@types';

const Courses = () => {
  const [update, setUpdate] = useState<CoursesType | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
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
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useCoursesDelete()
  const deleteItem = async (id: number) => {
    console.log(id);
    deleteFn(id);
  }
  const editItem = (record: CoursesType) => {
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
    handlePagination({ pagination, setParams })
  }
  const columns = [
    ...(CourseColumns ?? []),
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: CoursesType) => (
        <>
          <Space size={"middle"}>
            <Tooltip title="Edit">
              <Button type="primary" size="small" onClick={() => editItem(record)}>
                <EditOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="Delete">
              {deleteId === record.id && (
                <PopConfirm
                  openPop={true}
                  setOpenPop={(open) => setDeleteId(open ? record.id! : null)}
                  handleDelete={() => {
                    deleteItem(record.id!);
                    setDeleteId(null);
                  }}
                  loading={isDeleting}
                />
              )}
              <Button
                type="primary"
                size="small"
                danger
                onClick={() => setDeleteId(record.id!)}
              >
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </Space>
        </>
      )
    }
  ];

  return (
    <div className="w-[100%] flex flex-col items-center">
      <div className="w-[100%] h-[40px] flex items-center justify-between">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Tooltip title = 'Add Course'>
          <Button 
            type="primary"
            onClick={() => setOpen(true)}
          >
            Add Course
        </Button>
        </Tooltip>
      </div>
      <Table
        columns={columns}
        dataSource={data?.data.courses}
        rowKey={(row) => row.id!}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.data.total,
          showSizeChanger: true,
          pageSizeOptions: ["4", "5", "6", "7", "10"],
        }}
        onRow={(record) => {
          return {
            title: record.description,
          };
        }}
        onChange={handleTableChange}
        style={{
          width: "100%",
          marginTop: '10px'
        }}
      />
      {open && <CourseModal
        open={open}
        toggle={toggle}
        update={update}
      />}
    </div>
  )
}

export default Courses