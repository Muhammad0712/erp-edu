import type { ModalProps, TeacherType } from '@types'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { teacherFormSchema } from '@utils'
import { Form, Input, InputNumber, Modal, Select } from 'antd'
import { useTeachers } from '@hooks'
import { useEffect } from 'react'
import { Option } from 'antd/es/mentions'

interface TeacherProps extends ModalProps {
    update: TeacherType | null
}
const TeacherModal = ({ open, toggle, update }: TeacherProps) => {

    const { useTeacherCreate } = useTeachers();
    const { mutate: createFn } = useTeacherCreate();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        resolver: yupResolver(teacherFormSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            phone: "",
            role: "",
            branch_id: NaN
        }
    });

    useEffect(() => {
        if (update?.id) {
            setValue('first_name', update.first_name);
            setValue('last_name', update.last_name);
            setValue('email', update.email);
            setValue('password', update.password);
            setValue('phone', update.phone);
            setValue('role', update.role);
            setValue('branch_id', update.branch_id);
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
    }

    const prefixSelector = (
        <Form.Item name="prefix" noStyle >
            <Select style={{ width: 90}} defaultValue={"+998"}>
                <Option value="+998">+998</Option>
            </Select>
        </Form.Item>
    );

    return (
        <>
            <Modal
                title={update?.id ? "Update Teacher" : "Create Teacher"}
                centered
                open={open}
                onCancel={() => {
                    toggle()
                    reset()
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
                        label='First Name'
                        name='first_name'
                        validateStatus={errors.first_name ? 'error' : ""}
                        help={errors.first_name ? errors.first_name.message : ""}
                        htmlFor='first_name'
                    >
                        <Controller
                            name='first_name'
                            control={control}
                            render={({ field }) => {
                                return <Input {...field} status={errors.first_name ? 'error' : ""} placeholder='First Name' id='first_name' autoComplete='off' />
                            }}

                        />
                    </Form.Item>
                    <Form.Item
                        label='Last Name'
                        name='last_name'
                        validateStatus={errors.last_name ? 'error' : ""}
                        help={errors.last_name ? errors.last_name.message : ""}
                        htmlFor='last_name'
                    >
                        <Controller
                            name='last_name'
                            control={control}
                            render={({ field }) => {
                                return <Input {...field} status={errors.last_name ? 'error' : ""} placeholder='Last Name' id='last_name' autoComplete='off' />
                            }}

                        />
                    </Form.Item>
                    <Form.Item
                        label='Email'
                        name='email'
                        validateStatus={errors.email ? 'error' : ""}
                        help={errors.email ? errors.email.message : ""}
                        htmlFor='email'
                    >
                        <Controller
                            name='email'
                            control={control}
                            render={({ field }) => {
                                return <Input {...field} status={errors.email ? 'error' : ""} placeholder='Email' id='email' autoComplete='off' />
                            }}

                        />
                    </Form.Item>
                    <Form.Item
                        label='Password'
                        name='password'
                        validateStatus={errors.password ? 'error' : ""}
                        help={errors.password ? errors.password.message : ""}
                        htmlFor='password'
                    >
                        <Controller
                            name='password'
                            control={control}
                            render={({ field }) => {
                                return <Input.Password {...field} status={errors.password ? 'error' : ""} placeholder='Password' id='password' autoComplete='off' />
                            }}
                        />
                    </Form.Item>
                    {/* <Form.Item
                        label='Phone'
                        name='phone'
                        validateStatus={errors.phone ? 'error' : ""}
                        help={errors.phone ? errors.phone.message : ""}
                        htmlFor='phone'
                    >
                        <Controller
                            name='phone'
                            control={control}
                            render={({ field }) => {
                                return <InputNumber {...field} status={errors.phone ? 'error' : ""} placeholder='Phone' id='phone' autoComplete='off' />
                            }}
                        />
                    </Form.Item> */}
                    <Form.Item
                        label="Phone"
                        name="phone"
                        validateStatus={errors.phone ? 'error' : ""}
                        help={errors.phone ? errors.phone.message : ""}
                        htmlFor='phone'
                    >
                        <Controller
                            name="phone"
                            control={control} 
                            render={({ field }) => (
                                <InputNumber 
                                    style={{ width: '100%' }}
                                    {...field}
                                    status={errors.phone ? 'error' : ""}
                                    placeholder="Phone"
                                    id="phone"
                                    autoComplete="off"
                                    addonBefore={prefixSelector}
                                />
                            )}
                        />
                    </Form.Item>
                </Form> 
            </Modal>
        </>
    )
}

export default TeacherModal