import { Form, Input, Modal } from 'antd';
import { useState } from 'react';
import type { Course } from '@types';
import { useCourses } from '@hooks';

interface Props{
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    resData?: Course
}

const CourseModal = ({ setOpen, open, resData }: Props) => {
    console.log('Course Modal');
    const [params, setParams] = useState({
        page: 1,
        limit: 10
    });
    const { useCoursesCreate} = useCourses(params);
    const { mutate: createFn } = useCoursesCreate();



    // --------------------STATES--------------------
    const [form, setForm] = useState<Course>({
        title: resData?.title || '',
        description: resData?.description || '',
        price: resData?.price || 0,
        duration: resData?.duration || '',
        lessons_in_a_week: resData?.lessons_in_a_week || 0,
        lesson_duration: resData?.lesson_duration || '',
    })
    const layout = {
        labelCol: { span: 14 },
        wrapperCol: { span: 40 },
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
    // ----------------------------------------------

    const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const payload = {
            title: form.title,
            description: form.description,
            price: form.price,
            duration: form.duration,
            lessons_in_a_week: form.lessons_in_a_week,
            lesson_duration: form.lesson_duration
        };
        createFn(payload, {
            onSuccess: () => { }
        })
        setOpen(false);
    };

    const handleCancel = async () => {
        setOpen(false);
    };

    return (
        <>

            <Modal
                title="Add Course"
                onOk={handleOk}
                onCancel={handleCancel}
                open={open}
            >
                <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{
                        width: '90%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: `center`,
                    }}
                    validateMessages={validateMessages}
                >
                    <div className="w-[70%] h-[100%] flex flex-col items-end">
                        <Form.Item className='flex justify-between w-[350px]' label="Title" rules={[{ required: true }]}>
                            <Input
                                style={{
                                    width: '205px',
                                }}
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item className='flex justify-between w-[350px] ' label="Price" rules={[{ type: 'number', min: 0 }]}>
                            <Input
                                style={{
                                    width: '204px',
                                }}
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                            />
                        </Form.Item>
                        <Form.Item className='flex justify-between w-[350px]' label="Duration" rules={[{ type: 'string' }]}>
                            <Input
                                style={{
                                    width: '195px',
                                }}
                                value={form.duration}
                                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item className='flex justify-between w-[350px]' label="Lessons in a week">
                            <Input
                                style={{
                                    width: '175px'
                                }}
                                value={form.lessons_in_a_week}
                                onChange={(e) => setForm({ ...form, lessons_in_a_week: Number(e.target.value) })}
                            />
                        </Form.Item>
                        <Form.Item className='flex justify-between w-[350px]' label="Lesson duration">
                            <Input
                                style={{
                                    width: '179px'
                                }}
                                value={form.lesson_duration}
                                onChange={(e) => setForm({ ...form, lesson_duration: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item className='flex justify-between w-[350px]' label="Description">
                            <Input.TextArea
                                style={{
                                    width: '265px',
                                    height: '100px'
                                }}
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                            />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default CourseModal;

