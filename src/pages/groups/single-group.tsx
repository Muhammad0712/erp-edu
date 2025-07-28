import { Button, Space, Table, Tooltip } from 'antd';
import { PopConfirm, StudentsColumns } from '@components';
import { EditOutlined } from '@ant-design/icons';
import { useGroup } from '@hooks';
import { useParams } from 'react-router-dom';
import type { StudentsType } from '@types';
import { useState } from 'react';
// import { LessonsList } from "@components";


const SingleGroup = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<StudentsType | null>(null);
  const { id } = useParams();
  const { students, group } = useGroup(undefined, Number(id!));
  console.log(students, 'students');
  console.log(group, 'group');

  const deleteItem = (id: number) => {
    console.log(id);
    // deleteFn(id);
  }
  const editItem = (record: StudentsType) => {
    setUpdate(record);
    setOpen(true);
  }
  // const toggle = () => {
  //   setOpen(!open);
  //   if (update) {
  //     setUpdate(null)
  //   }
  // }

  const columns = [
    ...(StudentsColumns ?? []),
    {
      title: "Action",
      key: "action",
      render: (_: any, record: StudentsType) => (
        <>
          <Space size={"middle"}>
            <Button type="primary" size="small" onClick={() => editItem(record)}>
              <EditOutlined />
            </Button>
            {<PopConfirm handleDelete={() => deleteItem(record.id!)} />}
          </Space>
        </>
      )
    }
  ]

  return (
    <div className='w-[100%] flex flex-col h-[545px] gap-2'>
      <div className="w-[100%] h-[200px] flex justify-between">
        <div className="w-[59.5%] h-[100%] bg-white"></div>
        <div className="w-[39.5%] h-[100%] bg-white p-[10px] flex flex-col justify-between">
          <p className='text-lg'>Group: {group?.data.group.name}</p>
          <p className='text-lg'>Course: {group?.data.group.course.title}</p>
          <p className='text-lg'>Start Date: {group?.data.group.start_date}</p>
          <p className='text-lg'>Start Time: {group?.data.group.start_time}</p>
          <p className='text-lg'>Group lessons count: {group?.data.group.lessons.length}</p>
        </div>
      </div>
      <div className="w-[100%] h-[200px] flex flex-wrap gap-[5px] bg-white overflow-y-scroll border-4 border-gray-300 p-[5px]">
      <div className="w-[100%] h-[50px] flex justify-between items-center bg-white p-[10px] border-2 border-gray-300 sticky top-0 left-0">
        <h1 className='text-lg'>Lessons</h1>
        <Button type='primary' onClick={() => {}}>
          Add Lesson
        </Button>
      </div>
        {/* <LessonsList lessons={group?.data.group.lessons} /> */}
        {group?.data.group.lessons.map((lesson: any) => {
          return (
            <Tooltip title={`${lesson.title}.  ${lesson.date.split("T")[0]}`} key={lesson.id}>
              <div key={lesson.id} className="w-[13.5%] h-[40px] bg-gray-200 flex flex-col items-center justify-center border cursor-pointer">
                <p>{lesson.title}</p>
                {/* <p>{lesson.date.split("T")[0]}</p> */}
              </div>
            </Tooltip>
          );
        })}
      </div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={students?.data.student ? [students.data.student] : []}
        rowKey={(row) => row.id!}
        style={{
          width: "100%",
        }}
      />
    </div>
  )
}

export default SingleGroup