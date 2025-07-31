import { Button, Form, Input, Modal, Select } from 'antd';
import { useEffect } from 'react';
import type { CoursesType, ModalProps } from '@types';
import { useCourses } from '@hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { courseFormSchema } from '@utils';
import { Controller, useForm } from 'react-hook-form';

interface CourseProps extends ModalProps {
    update: CoursesType | null;
}

const CourseModal = ({ open, toggle, update, }: CourseProps) => {
    const { useCoursesCreate, useCoursesUpdate } = useCourses({ page: 1, limit: 10 });
    const { mutate: createFn, isPending: isCreating } = useCoursesCreate();
    const { mutate: updateFn, isPending: isUpdating } = useCoursesUpdate();

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
            price: 1600000,
            duration: 3,
            lessons_in_a_week: 3,
            lessons_in_a_month: 12,
            lesson_duration: 240
        }
    })

    useEffect(() => {
        if (update?.id) {
            setValue('title', update.title);
            setValue('description', update.description);
            setValue('price', update.price);
            setValue('duration', update.duration);
            setValue('lessons_in_a_week', update.lessons_in_a_week);
            setValue('lessons_in_a_month', update.lessons_in_a_month);
            setValue('lesson_duration', update.lesson_duration);
        } else {
            reset();
        }
    }, [update, setValue, reset]);

    const onSubmit = (data: any) => {
        const mutationConfig = {
            onSuccess: () => {
                toggle();
                reset();
            },
        };

        if (update?.id) {
            updateFn({data: data, id: update.id}, mutationConfig);
        } else {
            createFn(data, mutationConfig);
        }
    };

    const handleCancel = () => {
        toggle();
        reset();
    };

    return (
        <>
            <Modal
                title={update?.id ? "Update Course" : "Add Course"}
                centered
                open={open}
                onCancel={handleCancel}
                width={600}
                closeIcon
                footer={null}
                maskClosable={false}
                keyboard={false}
            >
                <Form
                    layout="vertical"
                    autoComplete="on"
                    onFinish={handleSubmit(onSubmit)}
                >
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <Form.Item
                            label="Title"
                            name="title"
                            validateStatus={errors.title ? 'error' : ""}
                            help={errors.title ? errors.title.message : ""}
                            htmlFor="title"
                            style={{ flex: 2 }}
                        >
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        status={errors.title ? 'error' : ""}
                                        placeholder="Enter course title"
                                        id="title"
                                        autoComplete="off"
                                    />
                                )}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Price (UZS)"
                            name="price"
                            validateStatus={errors.price ? 'error' : ""}
                            help={errors.price ? errors.price.message : ""}
                            htmlFor="price"
                            style={{ flex: 1 }}
                        >
                            <Controller
                                name="price"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        status={errors.price ? 'error' : ""}
                                        placeholder="1600000"
                                        id="price"
                                        autoComplete="off"
                                        type="number"
                                    />
                                )}
                            />
                        </Form.Item>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                        <Form.Item
                            label="Duration (months)"
                            name="duration"
                            validateStatus={errors.duration ? 'error' : ""}
                            help={errors.duration ? errors.duration.message : ""}
                            htmlFor="duration"
                            style={{ flex: 1 }}
                        >
                            <Controller
                                name="duration"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        status={errors.duration ? 'error' : ""}
                                        placeholder="3"
                                        id="duration"
                                        autoComplete="off"
                                        type="number"
                                    />
                                )}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Lessons per week"
                            name="lessons_in_a_week"
                            validateStatus={errors.lessons_in_a_week ? 'error' : ""}
                            help={errors.lessons_in_a_week ? errors.lessons_in_a_week.message : ""}
                            htmlFor="lessons_in_a_week"
                            style={{ flex: 1 }}
                        >
                            <Controller
                                name="lessons_in_a_week"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        status={errors.lessons_in_a_week ? 'error' : ""}
                                        id="lessons_in_a_week"
                                        placeholder="Select lessons per week"
                                    >
                                        <Select.Option value={3}>3 lessons</Select.Option>
                                        <Select.Option value={5}>5 lessons</Select.Option>
                                    </Select>
                                )}
                            />
                        </Form.Item>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                        <Form.Item
                            label="Lessons per month"
                            name="lessons_in_a_month"
                            validateStatus={errors.lessons_in_a_month ? 'error' : ""}
                            help={errors.lessons_in_a_month ? errors.lessons_in_a_month.message : ""}
                            htmlFor="lessons_in_a_month"
                            style={{ flex: 1 }}
                        >
                            <Controller
                                name="lessons_in_a_month"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        status={errors.lessons_in_a_month ? 'error' : ""}
                                        placeholder="12"
                                        id="lessons_in_a_month"
                                        autoComplete="off"
                                        type="number"
                                    />
                                )}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Lesson duration (minutes)"
                            name="lesson_duration"
                            validateStatus={errors.lesson_duration ? 'error' : ""}
                            help={errors.lesson_duration ? errors.lesson_duration.message : ""}
                            htmlFor="lesson_duration"
                            style={{ flex: 1 }}
                        >
                            <Controller
                                name="lesson_duration"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        status={errors.lesson_duration ? 'error' : ""}
                                        placeholder="240"
                                        id="lesson_duration"
                                        autoComplete="off"
                                        type="number"
                                    />
                                )}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label="Description"
                        name="description"
                        validateStatus={errors.description ? 'error' : ""}
                        help={errors.description ? errors.description.message : ""}
                        htmlFor="description"
                    >
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Input.TextArea
                                    {...field}
                                    status={errors.description ? 'error' : ""}
                                    placeholder="Enter course description..."
                                    id="description"
                                    autoComplete="off"
                                    rows={4}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, marginTop: '24px' }}>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <Button
                                onClick={handleCancel}
                                disabled={isCreating || isUpdating}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isCreating || isUpdating}
                            >
                                {update?.id ? "Update Course" : "Create Course"}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CourseModal;