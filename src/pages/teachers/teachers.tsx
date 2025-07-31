import type { TeachersType } from "@types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGeneral, useTeachers } from "@hooks";
import { Button, Space, Table, Tooltip, type TablePaginationConfig } from "antd";
import { PopConfirm, TeacherColumns } from "@components";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TeachersModal } from "@pages";


const Teachers = () => {
  const [update, setUpdate] = useState<TeachersType | null>(null);
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
  const { data, useTeachersDelete } = useTeachers(params);
  console.log(data);
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useTeachersDelete();
  const deleteItem = async (id: number) => {
    deleteFn(id);
  }
  const editItem = (record: TeachersType) => {
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
      render: (_: any, record: TeachersType) => (
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
    <>
      <div className="w-[100%] flex flex-col items-center">
        <div className="w-[100%] h-[40px] flex items-center justify-between">
          <h1 className="text-2xl font-bold">Teachers</h1>
          <Tooltip title="Add Teacher">
            <Button
              type="primary"
              onClick={toggle}
            >
              Add teacher
            </Button>
          </Tooltip>
        </div>
        <Table
          columns={columns}
          dataSource={data?.data.data}
          rowKey={(row) => row.id!}
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
        {open && <TeachersModal
          open={open}
          toggle={toggle}
          update={update}
        />}
      </div>
    </>
  )
}

export default Teachers