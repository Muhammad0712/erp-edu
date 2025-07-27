import { type ColumnsType } from 'antd/es/table';
import { type RoomsType } from '@types';

export const RoomColumns: ColumnsType<RoomsType> = [
    {
        title: 'Branch',
        dataIndex: 'branch',
        key: 'branch',
        render: (branch) => branch.name,
    },
    {
        title: 'Room Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Capacity',
        dataIndex: 'capacity',
        key: 'capacity',
    }
];
