import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const AddGroupModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
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
                <input type="text" name='name' className='border-none outline-none bg-gray-100 rounded-md w-[100%] h-[40px] text-xl'/>
            </div>
            <div className="w-[90%] flex flex-col gap-[10px]">
                <label>Course:</label>
                <input type="text" name='course_id' className='border-none outline-none bg-gray-100 rounded-md w-[100%] h-[40px] text-xl'/>
            </div>
            <div className="w-[90%] flex flex-col gap-[10px]">
                <label>Start Date:</label>
                <input type="date" name='start_date' className='border-none outline-none bg-gray-100 rounded-md w-[100%] h-[40px] text-xl'/>
            </div>
            <div className="w-[90%] flex flex-col gap-[10px]">
                <label>End Date:</label>
                <input type="date" name='end_date' className='border-none outline-none bg-gray-100 rounded-md w-[100%] h-[40px] text-xl'/>
            </div>
        </form>
      </Modal>
    </>
  );
};

export default AddGroupModal;

