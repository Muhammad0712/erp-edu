import React, { useEffect, useState } from 'react';
import { Button, Modal, Select} from 'antd';
import { coursesService } from '@service/courses.service';
import { groupsService } from '@service/groups.service'
import { Notification } from '@helpers';

const AddGroupModal = ({onSuccess}: any) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    course_id: 0,
    start_date: '2020-01-01',
    end_date: '2020-01-01',
    status: '',
  });
  const [courses, setCourses] = useState([{
    title: ""
  }])

  const showModal = () => {
    setOpen(true);
  };

  useEffect(()=> {
    getAllCourses();  
  })

  const getAllCourses = async () => {
    const res = await coursesService.getAllCourses();
    const courseList = res?.data?.courses;
  
    if (Array.isArray(courseList)) {
      setCourses(courseList);
    } else {
      setCourses([]);
    }
  
    return res;
  };
  
  const handleOk = async(e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      course_id: form.course_id,
      start_date: new Date(form.start_date),
      end_date: new Date(form.end_date),
      status: form.status
    };
    const res = await groupsService.createGroup(payload);
    console.log(res);
    if (res?.status === 201) {
      Notification('success', "Guruh muvaffaqiyatli qo'shildi")
      onSuccess()
    }
    setOpen(false);
  };

  const handleCancel = async() => {
    setOpen(false);
  };


  return (
    <>
      <Button type="primary"
        className="!border-2 !text-white !w-[120px] !h-[40px] !flex !items-center !justify-center !rounded-md !bg-black !opacity-50"
        onClick={showModal}
      >
        + Add Group
      </Button>
      <Modal
        title="Add Group"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className='w-[100%] flex flex-col gap-[20px] items-center'>
            <div className="w-[90%] flex flex-col gap-[5px]">
                <label>Group name:</label>
                <input type="text" required value={form.name} className='border-none outline-none bg-gray-100 rounded-md w-[100%] h-[40px] text-xl' onChange={(e)=> setForm({...form, name: e.target.value})}/>
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
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={courses.map(course => ({
                label: course.title,
                value: course.id
              }))}
              onChange={(value) => setForm({ ...form, course_id: Number(value) })}
              />
            </div>
            <div className="w-[90%] flex flex-col gap-[10px]">
                <label>Start Date:</label>
                <input type="date" required value={form.start_date} className='border-none outline-none bg-gray-100 rounded-md w-[100%] h-[40px] text-xl' onChange={(e)=> setForm({...form, start_date: e.target.value})}/>
            </div>
            <div className="w-[90%] flex flex-col gap-[10px]">
                <label>End Date:</label>
                <input type="date" required value={form.end_date} className='border-none outline-none bg-gray-100 rounded-md w-[100%] h-[40px] text-xl' onChange={(e)=> setForm({...form, end_date: e.target.value})}/>
            </div>
            <div className="w-[90%] flex flex-col gap-[10px]">
                <label>Status: </label>
                <select required value={form.status} className='border-none outline-none bg-gray-100 rounded-md w-[100%] h-[40px] text-xl' onChange={(e)=> setForm({...form, status: e.target.value})}>
                  <option value="new">New</option>
                  <option value="active">Active</option>
                </select>
            </div>
        </form>
      </Modal>
    </>
  );
};

export default AddGroupModal;

