import type { ColumnsType } from "antd/es/table";
import type { StudentsType } from "@types";

export const StudentsColumns: ColumnsType<StudentsType> = [
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
        title: 'Date Of Birth',
        dataIndex: 'date_of_birth',
        key: 'date_of_birth',
    }
];