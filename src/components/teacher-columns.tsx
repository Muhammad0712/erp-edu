import type { ColumnsType } from "antd/es/table";
import type { TeacherType } from "@types";


export const TeacherColumns: ColumnsType<TeacherType> = [
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
        render: (branches) => <span>{branches.name}</span>
    },
]