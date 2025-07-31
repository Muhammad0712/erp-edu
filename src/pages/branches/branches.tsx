import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import type { BranchesType } from '@types';
import { useBranches, useGeneral } from '@hooks';
import { Button, Space, Table, Tooltip, type TablePaginationConfig } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { PopConfirm } from '@components';
import BranchModal from './modals/branch.modal';
import { BranchColumns } from '@components';

const Branches = () => {
  const [update, setUpdate] = useState<BranchesType | null>(null);
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

  const { data, useBranchesDelete } = useBranches(params);
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useBranchesDelete();
  const deleteItem = async (id: number) => {
    deleteFn(id);
  }
  const editItem = (record: BranchesType) => {
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
    ...(BranchColumns ?? []),
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: BranchesType) => (
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
        {open && <BranchModal open={open} toggle={toggle} update={update} />}
        <div className="w-full h-[40px] flex justify-between items-center">
          <h1 className="text-2xl font-bold">Branches</h1>
          <Tooltip title="Add student">
            <Button
              type="primary"
              onClick={() => setOpen(true)}
            >
              Add Branch
            </Button>
          </Tooltip>
        </div>
        <Table<BranchesType>
          columns={columns}
          dataSource={data?.data?.branch}
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

export default Branches