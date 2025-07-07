import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { groupsService } from '../../../service';
import { Notification } from '../../../helpers';

type Props = {
    id: any;
    onSuccess?: () => void;
  };

const UpdateGroupModal = ({ id, onSuccess = () => {} }: Props) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    course_id: 0,
    start_date: '2020-01-01',
    end_date: '2020-01-01',
    status: '',
  })

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async(e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const payload = {
        name: form.name,
        course_id: form.course_id,
        start_date: form.start_date,
        end_date: form.end_date,
        status: form.status
    }
    const res = await groupsService.updateGroupById(id, payload)
    if (res?.status === 200) {
        Notification('success', "Guruh muvaffaqiyatli o'zgartirildi")
        onSuccess()
    }
    setOpen(false);
  };
  
  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  return (
    <>
      <Button type='primary' onClick={showModal} className="!w-[60px] !h-[30px] !border !rounded-md !bg-transparent !border-black !transition-none">
        <span className='!text-black'>Update</span>
      </Button>
      <Modal
        title="Basic Modal"
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
                <input type="text" required value={form.course_id} className='border-none outline-none bg-gray-100 rounded-md w-[100%] h-[40px] text-xl' onChange={(e)=> setForm({...form, course_id: Number(e.target.value)})}/>
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
                <input type="text" required value={form.status} className='border-none outline-none bg-gray-100 rounded-md w-[100%] h-[40px] text-xl' onChange={(e)=> setForm({...form, status: e.target.value})}/>
            </div>
        </form>
      </Modal>
    </>
  );
};

export default UpdateGroupModal;