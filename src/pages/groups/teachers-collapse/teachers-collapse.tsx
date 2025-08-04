import React from 'react';
import type { CollapseProps } from 'antd';
import { Avatar, Button, Collapse, Tooltip } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { useGroup } from '@hooks';

const TeachersCollapse = ({ data }: any) => {
    const { useGroupTeacherDelete } = useGroup();
    const { mutate: deleteFn } = useGroupTeacherDelete();
    const deleteItem = (id: number) => {
        // deleteFn(id);
        console.log(id, "id");
    }
    const items: CollapseProps['items'] = data.map((teacher: any) => {

        return {
            key: teacher?.teacher?.id,
            label:
                <div className='flex justify-between items-center'>
                    <div className="w-[80%] flex items-center">
                        <Avatar src={teacher.teacher?.avatar_url || undefined} icon={<UserOutlined />} style={{ marginRight: '10px' }} />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '17px'
                                }}
                            >{teacher?.teacher?.first_name + " " + teacher?.teacher?.last_name}</span>
                            <p
                                style={{
                                    fontSize: '12px',
                                    color: 'gray',
                                    textTransform: 'capitalize'
                                }}
                            >{teacher?.teacher?.role}</p>
                        </div>
                    </div>
                    {teacher?.teacher?.is_active ?
                        <div
                            style={{
                                width: '70px',
                                height: '20px',
                                fontSize: '12px',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '5px',
                                alignItems: 'center',
                                borderRadius: '10px',
                                color: 'green',
                                backgroundColor: 'rgb(173,255,173)'
                            }}
                        >
                            <CheckCircleOutlined style={{ color: 'green' }} /> Active
                        </div>
                        :
                        <div
                            style={{
                                width: '100px',
                                height: '20px',
                                fontSize: '12px',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '5px',
                                alignItems: 'center',
                                borderRadius: '5px',
                                border: "1px solid red",
                                color: 'red',
                                backgroundColor: 'rgb(255,173,173)'
                            }}
                        > <CloseCircleOutlined style={{ color: 'red' }} /> InActive</div>
                    }
                </div>,
            children: <div className='w-[100%] flex justify-between items-center'>
                <div className="w-[50%] flex flex-col">
                    <div className='flex gap-2'>
                        <p className='w-[70px] flex gap-1'><MailOutlined /> Email:</p>
                        <p>{teacher?.teacher?.email}</p>
                    </div>
                    <div className='flex gap-2'>
                        <p className='w-[70px] flex gap-1'><PhoneOutlined /> Phone: </p>
                        <p>{teacher?.teacher?.phone}</p>
                    </div>
                </div>
                <Tooltip title="Delete teacher">
                    <Button type='primary' danger>
                        <DeleteOutlined />
                    </Button>
                </Tooltip>
            </div>
        }
    });
    return <Collapse
        items={items}
        defaultActiveKey={['1']}
        expandIcon={() => null}
        style={{
            width: '100%',
            borderRadius: '5px'
        }}
    />;
};

export default TeachersCollapse;