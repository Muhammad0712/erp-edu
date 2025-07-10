import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Modal } from 'antd';



const CourseModal = () => {
    const [open, setOpen] = useState(false)

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = (values: any) => {
        console.log(values);
    };

    const showModal = () => {
        setOpen(true);
    };
    // ----------------------------------------------

    const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setOpen(false);
    };

    const handleCancel = async () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary"
                className="!border-2 !text-white !w-[120px] !h-[40px] !flex !items-center !justify-center !rounded-md !bg-[green]"
                onClick={showModal}
            >
                + Add Course
            </Button>
            <Modal
                title="Add Course"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: `'center'`,
                    }}
                    validateMessages={validateMessages}
                >
                    <div className="w-[70%] h-[100%] flex flex-col items-end border">
                        <Form.Item className='flex justify-start border w-[300px]' label="Title" rules={[{ required: true }]}>
                            <Input style={{
                                width: '200px'
                            }}/>
                        </Form.Item>
                        <Form.Item className='flex justify-start border w-[300px]' label="Price" rules={[{ type: 'number', min: 0 }]}>
                            <Input style={{
                                width: '200px'
                            }} />
                        </Form.Item>
                        <Form.Item className='flex justify-start border w-[300px]' label="Duration" rules={[{ type: 'string' }]}>
                            <InputNumber style={{
                                width: '200px'
                            }} />
                        </Form.Item>
                        <Form.Item className='flex justify-start border w-[300px]' label="Lessons in a week">
                            <Input style={{
                                width: '200px'
                            }}/>   
                        </Form.Item>
                        <Form.Item className='flex justify-start border w-[300px]' label="Lesson duration">
                            <Input style={{
                                width: '200px'
                            }}/>
                        </Form.Item>
                        <Form.Item className='flex justify-start border w-[300px]' label="Description">
                            <Input.TextArea style={{
                                width: '200px'
                            }} />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default CourseModal;

