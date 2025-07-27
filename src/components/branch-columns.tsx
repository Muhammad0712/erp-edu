import type { ColumnsType } from "antd/es/table";
import type { BranchesType } from "@types";

export const BranchColumns: ColumnsType<BranchesType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: `Call number`,
        dataIndex: 'call_number',
        key: 'call_number',
    },
]