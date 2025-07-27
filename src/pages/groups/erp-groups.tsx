import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tooltip, type TablePaginationConfig } from "antd";
import { PopConfirm, GroupColumns } from "@components";
import { Link, useLocation } from "react-router-dom";
import { useGroup, useGeneral } from "@hooks";
import GroupModal from "./modals/group.modal";
import { useEffect, useState } from "react";
import { type Group } from "@types";

const Groups = () => {
  const [update, setUpdate] = useState<Group | null>(null);
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

  const { data, useGroupDelete } = useGroup(params);
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useGroupDelete();
  const deleteItem = (id: number) => {
    console.log(id);
    deleteFn(id);
  }
  const editItem = (record: Group) => {
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
    ...(GroupColumns ?? []),
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Group) => (
        <>
          <Space size={"middle"}>
            <Tooltip title="Edit" >
              <Button type="primary" size="small" onClick={() => editItem(record)}>
                <EditOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="Delete" >
              <PopConfirm handleDelete={() => deleteItem(record.id!)} loading={isDeleting} />
            </Tooltip>
            <Tooltip title="View" >
              <Link to={`/admin/groups/${record.id!}`}><EyeOutlined style={{
                fontSize: "20px"
              }} /></Link>
            </Tooltip>
          </Space>
        </>
      )
    }
  ]

  return (
    <>
      {open && <GroupModal open={open} toggle={toggle} update={update} />}
      <div className="w-full flex flex-col gap-2">
        <div className="w-full h-[40px] flex  justify-between">
          <h1 className="text-2xl font-bold">Groups</h1>
          <Tooltip title="Add Group" >
            <Button
              type="primary"
              onClick={() => setOpen(true)}
              size="large"
            >
              Add Group
            </Button>
          </Tooltip>
        </div>
        <Table<Group>
          columns={columns}
          dataSource={data?.data.data}
          rowKey={(row) => row.id!}
          pagination={{
            current: params.page,
            pageSize: params.limit,
            total: data?.data.total,
            showSizeChanger: true,
            pageSizeOptions: ["4", "5", "6", "7", "10"],
          }}
          style={{
            width: "100%",
          }}
          onChange={handleTableChange}
        />
      </div>
    </>
  );
};


export default Groups;
