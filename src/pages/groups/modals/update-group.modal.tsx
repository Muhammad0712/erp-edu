import React, { useState } from 'react';
import { Modal, Select } from 'antd';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space, theme } from 'antd';
import type { Dayjs } from 'dayjs';
import type { Group } from '@types';
import { groupsService } from '@service/groups.service';
import { Notification } from '@helpers';
// import { coursesService } from '@service/courses.service';
import { useCourses } from '@hooks/useCourses';



const UpdateGroupModal = ({resData}: any) => {
  const [open, setOpen] = useState(false);

  const { data } = useCourses()
  const allCourses = data?.data.courses;
  console.log(allCourses);
  
  const [form, setForm] = useState<Group>({
    id: resData.id,
    name: resData.name,
    course_id: resData.course_id,
    start_date: ``,
    end_date: ``,
    status: ``
  });

 

  const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      course_id: form.course_id,
      start_date: form.start_date,
      end_date: form.end_date,
      status: form.status
    };
    const res = await groupsService.updateGroup(payload, resData.id);
    if (res?.status === 200) {
      Notification('success', "Guruh muvaffaqiyatli o'zgartirildi")
    }
    setOpen(false);
  };

  const handleCancel = async () => {
    setOpen(false);
  };
  
  const { token } = theme.useToken();
  const style: React.CSSProperties = {
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: '50%',
  };
  const cellRender: DatePickerProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type !== 'date') {
      return info.originNode;
    }
    if (typeof current === 'number' || typeof current === 'string') {
      return <div className="ant-picker-cell-inner">{current}</div>;
    }
    return (
      <div className="ant-picker-cell-inner" style={current.date() === 1 ? style : {}}>
        {current.date()}
      </div>
    );
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className='w-[100%] flex flex-col gap-[20px] items-center'>
          <div className="w-[90%] flex flex-col gap-[5px]">
            <label>Group name:</label>
            <input type="text" required value={form.name} className='border-none outline-none bg-gray-100 rounded-md w-[100%] h-[40px] text-xl' onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="w-[90%] flex flex-col gap-[10px]">
            <label>Course:</label>
            {/* <input type="text" required value={form.course_id} className='border-none outline-none bg-gray-100 rounded-md w-[100%] h-[40px] text-xl' onChange={(e)=> setForm({...form, course_id: Number(e.target.value)})}/> */}
            <Select
              showSearch
              style={{
                width: '100%',
                height: '40px',
                border: 'none',
                outline: 'none',
                backgroundColor: '#f3f4f6', // Tailwind: bg-gray-100
                borderRadius: '0.375rem',   // Tailwind: rounded-md
                fontSize: '1.25rem',        // Tailwind: text-xl
              }}
              placeholder="Search to Select"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                String(optionA?.label ?? '').toLowerCase().localeCompare(String(optionB?.label ?? '').toLowerCase())
              }
              options={allCourses.map((course: any) => ({
                label: course.title,
                value: course.id
              }))}
              onChange={(value) => setForm({ ...form, course_id: Number(value) })}
            />
          </div>
          <Space size={10} direction="vertical">
            <div className="w-[90%] flex gap-1 items-center ">
              <label className='w-[80px]'> Start date:</label>
              <DatePicker cellRender={cellRender} required value={form.start_date} onChange={(value) => setForm({ ...form, start_date: value })}
              />
            </div>
            <div className="w-[90%] flex gap-1 items-center ">
              <label className='w-[80px]'> End date:</label>
              <DatePicker cellRender={cellRender} required value={form.end_date} onChange={(value) => setForm({ ...form, end_date: value })} />
            </div>
          </Space>
          <div className="w-[90%] flex flex-col gap-[10px]">
            <label>Status: </label>
            <Select
              showSearch

              placeholder="Search to Select"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={[
                {
                  label: 'new',
                  value: 'new'
                },
                {
                  label: 'active',
                  value: 'active'
                },
              ]}
              value={form.status}
              onChange={(value) => setForm({ ...form, status: value })}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UpdateGroupModal;

