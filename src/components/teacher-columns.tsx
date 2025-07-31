import type { ColumnsType } from "antd/es/table";
import type { TeachersType } from "@types";


export const TeacherColumns: ColumnsType<TeachersType> = [
    {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
    },
    {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Branches',
        dataIndex: 'branches',
        key: 'branches',
        render: (branch) => {
            return branch.map((branch: any) => branch.name).join(', ');
        },
    },
]