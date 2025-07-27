import { Button, Space, Table, Tooltip, type TablePaginationConfig } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import RoomsModal from './modals/rooms.modal';
import { useEffect, useState } from 'react';
import { PopConfirm, RoomColumns } from '@components';
import type { RoomsType } from '@types';
import { useGeneral } from '@hooks';
import { useRooms } from '@hooks';

const Rooms = () => {
  const [update, setUpdate] = useState<RoomsType | null>(null);
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

  const { data, useRoomsDelete } = useRooms(params)
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useRoomsDelete()
  const deleteItem = async (id: number) => {
    console.log(id);
    deleteFn(id);
  }
  const editItem = (record: RoomsType) => {
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
    ...(RoomColumns ?? []),
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: RoomsType) => (
        <>
          <Space>
            <Button type="primary" size="small" onClick={() => editItem(record)}>
              <EditOutlined />
            </Button>
            <PopConfirm handleDelete={() => deleteItem(record.id!)} loading={isDeleting} />
          </Space>
        </>
      ),
    },
  ];

  return (
    <div className="w-[100%] flex flex-col items-center">
      <div className="w-[100%] h-[40px] flex items-center justify-between">
        <h1 className="text-2xl font-bold">Rooms</h1>
        <Tooltip title='Add Room'>
          <Button type="primary"
            onClick={() => setOpen(true)}
            size='large'
          >
            Add Room
          </Button>
        </Tooltip>
      </div>
      <Table
        columns={columns}
        dataSource={data?.data.rooms}
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
            title: record.name,
          };
        }}
        onChange={handleTableChange}
        style={{
          width: "100%",
          marginTop: '10px'
        }}
      />
      {open && <RoomsModal
        open={open}
        toggle={toggle}
        update={update}
      />}
    </div>
  )
}

export default Rooms