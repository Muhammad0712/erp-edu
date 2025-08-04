import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Button,
  Space,
  Table,
  Tooltip,
  type TablePaginationConfig,
} from "antd";
import { PopConfirm, GroupColumns } from "@components";
import { Link, useLocation } from "react-router-dom";
import { useGroup, useGeneral } from "@hooks";
import GroupModal from "./modals/group.modal";
import { useCallback, useEffect, useMemo, useState } from "react";
import { type GroupsType } from "@types";

const Groups = () => {
  const [update, setUpdate] = useState<GroupsType | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const location = useLocation();
  const { handlePagination } = useGeneral();

  const [params, setParams] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      page: Number(searchParams.get("page") ?? 1),
      limit: Number(searchParams.get("limit") ?? 10),
    };
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    if (page && limit) {
      setParams({
        page: Number(page),
        limit: Number(limit),
      });
    }
  }, [location.search]);

  const { data, useGroupDelete } = useGroup(params);
  const { mutate: deleteFn, isPending: isDeleting } = useGroupDelete();

  const deleteItem = useCallback(
    (id: number) => {
      deleteFn(id);
    },
    [deleteFn]
  );

  const editItem = useCallback((record: GroupsType) => {
    const roomId = Number(record.lessons?.[0]?.room?.id);
    setUpdate({ ...record, roomId });
    setOpen(true);
  }, []);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
    if (update) setUpdate(null);
  }, [update]);

  const handleTableChange = useCallback(
    (pagination: TablePaginationConfig) => {
      handlePagination({ pagination, setParams });
    },
    [handlePagination]
  );

  const columns = useMemo(() => [
    ...(GroupColumns ?? []),
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: GroupsType) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              type="primary"
              size="small"
              onClick={() => editItem(record)}
            >
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Delete">
            {deleteId === record.id && (
              <PopConfirm
                openPop={true}
                setOpenPop={(open) =>
                  setDeleteId(open ? record.id! : null)
                }
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
          <Tooltip title="View">
            <Link to={`/admin/groups/${record.id!}`}>
              <EyeOutlined style={{ fontSize: "15px" }} />
            </Link>
          </Tooltip>
        </Space>
      ),
    },
  ], [deleteId, editItem, deleteItem, isDeleting]);

  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full h-[40px] flex justify-between items-center">
          <h1 className="text-2xl font-bold">Groups</h1>
          {open && <GroupModal open={open} toggle={toggle} update={update} />}
          <Tooltip title="Add Group">
            <Button type="primary" onClick={() => setOpen(true)}>
              Add Group
            </Button>
          </Tooltip>
        </div>
        <Table<GroupsType>
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
          onChange={handleTableChange}
        />
      </div>
    </>
  );
};

export default Groups;
