import { Form, Input, Modal } from 'antd';
import { useEffect } from 'react';
import type { Course, ModalProps } from '@types';
import { useCourses } from '@hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { courseFormSchema } from '@utils';
import { Controller, useForm } from 'react-hook-form';

interface CourseProps extends ModalProps {
    update: Course | null;
}

const CourseModal = ({ open, toggle, update, }: CourseProps) => {
    const { useCoursesCreate } = useCourses();
    const { mutate: createFn } = useCoursesCreate();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        resolver: yupResolver(courseFormSchema),
        defaultValues: {
            title: '',
            description: '',
            price: 0,
            duration: '',
            lessons_in_a_week: 0,
            lesson_duration: 0
        }
    })

    useEffect(() => {
        if (update?.id) {
            setValue('title', update.title);
            setValue('description', update.description);
            setValue('price', update.price);
            setValue('duration', update.duration);
            setValue('lessons_in_a_week', update.lessons_in_a_week);
            setValue('lesson_duration', update.lesson_duration);
        } else {
            reset();
        }
    }, [update, setValue, reset]);

    const onSubmit = (data: any) => {
        if (update?.id) {
            createFn(data, {
                onSuccess: () => {
                    toggle();
                    reset();
                }
            });
        } else {
            createFn(data, {
                onSuccess: () => {
                    toggle();
                    reset();
                }
            });
        }
    };


    return (
        <>
            <Modal
                title={update?.id ? "Update Course" : "Add Course"}
                centered
                open={open}
                onCancel={() => {
                    toggle()
                    reset();
                }}
                width={500}
                closeIcon
                footer={null}
            >
                <Form
                    layout='vertical'
                    autoComplete='on'
                    onFinish={handleSubmit(onSubmit)}
                >
                    <Form.Item 
                        label="Title"
                        name="title"
                        validateStatus={errors.title ? 'error': ""}    
                        help={errors.title ? errors.title.message : ""}
                        htmlFor='title'
                    >
                        <Controller
                            name='title'
                            control={control}
                            render={({ field }) => (
                                <Input {...field} status={errors.title ? 'error': ""} placeholder='Title' id='title' autoComplete='off'/>
                            )}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Price"
                        name="price"
                        validateStatus={errors.price ? 'error': ""}    
                        help={errors.price ? errors.price.message : ""}
                        htmlFor='price'
                    >
                        <Controller
                            name='price'
                            control={control}
                            render={({ field }) => (
                                <Input {...field} status={errors.price ? 'error': ""} placeholder='Price' id='price' autoComplete='off'/>
                            )}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Duration"
                        name="duration"
                        validateStatus={errors.duration ? 'error': ""}
                        help={errors.duration ? errors.duration.message : ""}
                        htmlFor='duration'
                        >
                        <Controller 
                            name='duration'
                            control={control}
                            render={({ field }) => (
                                <Input {...field} status={errors.duration ? 'error': ""} placeholder='Duration' id='duration' autoComplete='off'/>
                            )}
                        />
                            
                    </Form.Item>
                    <Form.Item 
                        label="lessons_in_a_week"
                        name="lessons_in_a_week"
                        validateStatus={errors.lessons_in_a_week ? 'error': ""}
                        help={errors.lessons_in_a_week ? errors.lessons_in_a_week.message : ""}
                        >
                        <Controller
                            name='lessons_in_a_week'
                            control={control}
                            render={({ field }) => (
                                <Input {...field} status={errors.lessons_in_a_week ? 'error': ""} placeholder='Lessons in a week' id='lessons_in_a_week' autoComplete='off'/>
                            )}
                        />
                        {/*SHU YERGA KELDIM  */}
                    </Form.Item>
                    <Form.Item 
                        label="lesson_duration"
                        name="lesson_duration"
                        validateStatus={errors.lesson_duration ? 'error': ""}
                        help={errors.lesson_duration ? errors.lesson_duration.message : ""}
                        >
                        <Controller
                            name='lesson_duration'
                            control={control}
                            render={({ field }) => (
                                <Input {...field} status={errors.lesson_duration ? 'error': ""} placeholder='Lesson duration' id='lesson_duration' autoComplete='off'/>
                            )}
                        />  
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        validateStatus={errors.description ? 'error': ""}
                        help={errors.description ? errors.description.message : ""}
                        htmlFor='description'
                    >
                        <Controller
                            name='description'
                            control={control}
                            render={({ field }) => (
                                <Input.TextArea {...field} status={errors.description ? 'error': ""} placeholder='Description' id='description' autoComplete='off'/>
                            )}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CourseModal;

