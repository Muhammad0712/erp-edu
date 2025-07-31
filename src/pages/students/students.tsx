import { useEffect, useState } from "react"
import type { StudentsType } from "@types";
import { useLocation } from "react-router-dom";
import { Button, Space, Table, Tooltip, type TablePaginationConfig } from "antd";
import { PopConfirm, StudentsColumns } from "@components";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { StudentsModal } from "@pages";
import { useGeneral, useStudent } from "@hooks";

const Students = () => {
  const [update, setUpdate] = useState<StudentsType | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10
  })
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

  const { data, useStudentDelete } = useStudent(params);
  console.log(data, 'data from students');
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useStudentDelete();
  const deleteItem = async (id: number) => {
    console.log(id);
    deleteFn(id);
  }
  const editItem = (record: StudentsType) => {
    setUpdate(record);
    setOpen(true);
  }
  const toggle = () => {
    setOpen(!open);
    if (update) {
      setUpdate(null);
    }
  }
  const handleTableChange = (pagination: TablePaginationConfig) => {
    handlePagination({ pagination, setParams })
  }
  const columns = [
    ...(StudentsColumns ?? []),
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: StudentsType) => (
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
    <div>
      <div className="w-full flex flex-col gap-2">
        {open && <StudentsModal open={open} toggle={toggle} update={update} />}
        <div className="w-full h-[40px] flex justify-between">
          <h1 className="text-2xl font-bold">Students</h1>
          <Tooltip title="Add student">
            <Button
              type="primary"
              onClick={() => setOpen(true)}
            >
              Add student
            </Button>
          </Tooltip>
        </div>
        <Table<StudentsType>
          columns={columns}
          dataSource={data?.data?.data}
          rowKey={(row) => row.id!}
          pagination={{
            current: params.page,
            pageSize: params.limit,
            total: data?.data.total,
            showSizeChanger: true,
            pageSizeOptions: ["4", "5", "6", "7", "10"]
          }}
          style={{
            width: "100%"
          }}
          onChange={handleTableChange}
        >
        </Table>
      </div>
    </div>
  )
}

export default Students