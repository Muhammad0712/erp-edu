import { type ColumnsType } from 'antd/es/table';
import { type Group } from '@types';

export const GroupColumns: ColumnsType<Group> = [
    {
        title: 'Group Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Course',
        dataIndex: 'course',
        key: 'course',
        render: (course) => <span>{course?.title}</span>,
    },
    {
        title: 'Start Date',
        dataIndex: 'start_date',
        key: 'start_date',
    },
    {
        title: 'End Date',
        dataIndex: 'end_date',
        key: 'end_date',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
];
