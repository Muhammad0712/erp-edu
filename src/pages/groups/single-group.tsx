import { Button, Space, Table, Tooltip } from 'antd';
import { PopConfirm, StudentsColumns } from '@components';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useGroup, useStudent } from '@hooks';
import { useParams } from 'react-router-dom';
import type { StudentsType } from '@types';
import { useState } from 'react';
import { StudentsModal, TeachersModal } from '@pages'
import { LessonsList } from "@components";


const SingleGroup = () => {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [update, setUpdate] = useState<StudentsType | null>(null);
  const { id } = useParams();
  const { students, group } = useGroup(undefined, Number(id!));
  const { useStudentCreate, useStudentUpdate, useStudentDelete } = useStudent(undefined);
  const { mutate: createFn, isPending: isCreating } = useStudentCreate();
  const { mutate: updateFn, isPending: isUpdating } = useStudentUpdate();
  const { mutate: deleteFn, isPending: isDeleting } = useStudentDelete();


  const deleteItem = (id: number) => {
    deleteFn(id);
  }
  const editItem = (record: StudentsType) => {
    setUpdate(record);
    setOpen(true);
  }
  const toggle = () => {
    setOpen(!open);
    if (update) {
      setUpdate(null)
    }
  }

  const columns = [
    ...(StudentsColumns ?? []),
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: StudentsType) => (
        <>
          <Space size={"middle"}>
            <Tooltip title="Edit">
              <Button type="primary" size="small" onClick={() => editItem(record)}>
                <EditOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="Delete">
              {deleteId === record.id && (
                <PopConfirm
                  openPop={true}
                  setOpenPop={(open) => setDeleteId(open ? record.id! : null)}
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
          </Space>
        </>
      )
    }
  ];

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
        <div className="w-[100%] h-[50px] flex justify-between items-center bg-white p-[10px] border-2 border-gray-300 sticky top-0 left-0 z-10">
          <h1 className='text-lg'>Lessons</h1>
          <Button type='primary' onClick={() => { }}>
            Add Lesson
          </Button>
        </div>
        {group?.data.group.lessons.map((lesson: any) => {
          return (
            <Tooltip title={`${lesson.title}.  ${lesson.date.split("T")[0]}`} key={lesson.id}>
              <div key={lesson.id} className="w-[13.5%] h-[40px] bg-gray-200 flex items-center justify-between border cursor-pointer relative">
                <p className='text-center'>{lesson.title}</p>
                {/* Burchakda uchburchak shaklini chiqarish kvadratni 45 degree qilib qo'yish */}
                <div className="w-[20px] h-[20px] bg-green-600 absolute top-0 right-0"
                  style={{ clipPath: 'polygon(100% 0%, 0% 0%, 100% 100%)' }}>
                </div>
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