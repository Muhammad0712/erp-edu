import { Table, type PaginationProps } from 'antd'
import React, { useState } from 'react'
import { useCourses } from '@hooks/useCourses';
import CourseModal from './modals/course.modal';

const Courses = () => {
  const { data, useCoursesDelete } = useCourses()
  const {mutate: deleteFn} = useCoursesDelete()
  const courses = data?.data.courses;

  // PAGINATION
  const [current, setCurrent] = useState(1);
  const pageSize = 6;
  const paginatedData = (courses ?? []).slice((current - 1) * pageSize, current * pageSize);
  const onChange: PaginationProps['onChange'] = (page) => {
    console.log('Sahifa:', page);
    setCurrent(page);
  };

  const handleDelete = async (res: any) => {
    deleteFn(res, {
      onSuccess: () => { }
    })
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Lessons in a week',
      dataIndex: 'lessons_in_a_week',
      key: 'lessons_in_a_week',
    },
    {
      title: 'Lesson_duration',
      dataIndex: 'lesson_duration',
      key: 'lesson_duration',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (res: any) => (
        <div className="flex gap-2">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-[60px] h-[30px]"
            onClick={() => handleDelete(res)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-[100%] flex flex-col items-center">
      <div className="w-[100%] h-[40px] flex items-center justify-between">
        <h1 className="text-2xl font-bold">Courses</h1>
        {<CourseModal/>}
      </div>
      <Table
        dataSource={paginatedData}
        rowKey='id'
        columns={columns}
        pagination={{
          current,
          pageSize,
          total: courses?.length ?? 0,
          onChange,
        }}
        style={{
          width: "100%",
          marginTop: '10px'
        }}
      />
    </div>
  )
}

export default Courses