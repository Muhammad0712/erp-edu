import type { BranchesType, ModalProps, TeachersType } from '@types'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { teacherFormSchema } from '@utils'
import { Button, Form, Input, Modal, Select } from 'antd'
import { useBranches, useTeachers } from '@hooks'
import { useEffect } from 'react'
import { IMaskInput } from 'react-imask'

interface TeacherProps extends ModalProps {
    update: TeachersType | null
}

const TeacherModal = ({ open, toggle, update }: TeacherProps) => {
    const { useTeacherCreate, useTeacherUpdate } = useTeachers();
    const { mutate: createFn, isPending: isCreating } = useTeacherCreate();
    const { mutate: updateFn, isPending: isUpdating } = useTeacherUpdate();
    const { data: branches } = useBranches();

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
            role: "assistant teacher",
            branchId: [undefined]
        }
    });

    useEffect(() => {
        if (update?.id) {
            setValue('first_name', update.first_name);
            setValue('last_name', update.last_name);
            setValue('email', update.email);
            setValue('phone', update.phone?.replace('+998', ''));
            setValue('role', update.role);
            if (Array.isArray(update.branchId)) {
                setValue('branchId', update.branchId);
            } else if (update.branchId !== undefined) {
                setValue('branchId', [update.branchId]);
            } else {
                setValue('branchId', []);
            }
        } else {
            reset();
        }
    }, [update, setValue, reset]);

    const onSubmit = (data: any) => {
        if (update?.id) {
            delete data.password
            updateFn({ data: data, id: update.id }, {
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

    const handleCancel = () => {
        toggle();
        reset();
    };

    const branchOptions = branches?.data.branch.map((branch: BranchesType) => ({
        label: branch.name,
        value: branch.id
    })) || [];

    return (
        <Modal
            title={update?.id ? "Update Teacher" : "Create Teacher"}
            centered
            open={open}
            onCancel={handleCancel}
            width={600}
            footer={null}
            maskClosable={false}
        >
            <Form
                layout='vertical'
                onFinish={handleSubmit(onSubmit)}
                style={{ marginTop: '20px' }}
            >
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Form.Item
                        label='First Name'
                        validateStatus={errors.first_name ? 'error' : ""}
                        help={errors.first_name?.message}
                        style={{ flex: 1 }}
                    >
                        <Controller
                            name='first_name'
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    status={errors.first_name ? 'error' : ""}
                                    placeholder='First Name'
                                    size="large"
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Last Name'
                        validateStatus={errors.last_name ? 'error' : ""}
                        help={errors.last_name?.message}
                        style={{ flex: 1 }}
                    >
                        <Controller
                            name='last_name'
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    status={errors.last_name ? 'error' : ""}
                                    placeholder='Last Name'
                                    size="large"
                                />
                            )}
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    label='Email'
                    validateStatus={errors.email ? 'error' : ""}
                    help={errors.email?.message}
                >
                    <Controller
                        name='email'
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                status={errors.email ? 'error' : ""}
                                placeholder='Email'
                                size="large"
                            />
                        )}
                    />
                </Form.Item>

                {
                    !update?.id && <Form.Item
                        label={update?.id ? 'New Password (optional)' : 'Password'}
                        validateStatus={errors.password ? 'error' : ""}
                        help={errors.password?.message}
                    >
                        <Controller
                            name='password'
                            control={control}
                            render={({ field }) => (
                                <Input.Password
                                    {...field}
                                    status={errors.password ? 'error' : ""}
                                    placeholder={update?.id ? "Leave empty to keep current password" : "Password"}
                                    size="large"
                                />
                            )}
                        />
                    </Form.Item>
                }

                <div style={{ display: 'flex', gap: '16px' }}>
                    <Form.Item
                        label="Phone"
                        validateStatus={errors.phone ? 'error' : ""}
                        help={errors.phone?.message}
                        style={{ flex: 1 }}
                    >
                        <Controller
                            name='phone'
                            control={control}
                            render={({ field }) => (
                                <IMaskInput
                                    mask="+998 (00) 000-00-00"
                                    placeholder="+998 (__) ___-__-__"
                                    lazy={false}
                                    unmask={true}
                                    {...field}
                                    controls={false}
                                    style={{
                                        width: "100%",
                                        padding: "6.5px 11px",
                                        border: "1px solid #d9d9d9",
                                        borderRadius: "6px",
                                        fontSize: "14px",
                                        lineHeight: "1.5715",
                                        boxShadow: "none",
                                        transition: "all 0.3s",
                                        outline: "none",
                                    }}
                                    onFocus={(e) => (e.target.style.border = "1px solid #40a9ff")}
                                    onBlur={(e) => (e.target.style.border = "1px solid #d9d9d9")}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Role"
                        validateStatus={errors.role ? 'error' : ''}
                        help={errors.role?.message}
                        style={{ flex: 1 }}
                    >
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Select role"
                                    status={errors.role ? 'error' : ""}
                                    size="large"
                                    options={[
                                        { value: 'assistant teacher', label: 'Assistant Teacher' },
                                        { value: 'main teacher', label: 'Main Teacher' }
                                    ]}
                                />
                            )}
                        />
                    </Form.Item>
                </div>
                <Form.Item
                    label="Branch"
                    validateStatus={errors.branchId ? "error" : ""}
                    help={errors.branchId?.message}
                    style={{ flex: 1 }}
                >
                    <Controller
                        name="branchId"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Select
                                {...field}
                                mode="multiple"
                                placeholder="Select branch"
                                options={branchOptions}
                                status={fieldState.error ? "error" : ""}
                                maxTagCount="responsive"
                            />
                        )}
                    />
                </Form.Item>

                <Form.Item style={{ marginTop: '30px', marginBottom: 0 }}>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                        <Button
                            onClick={handleCancel}
                            disabled={isCreating || isUpdating}
                            size="large"
                        >
                            Cancel
                        </Button>
                        <Button
                            type='primary'
                            htmlType='submit'
                            loading={isCreating || isUpdating}
                            size="large"
                        >
                            {update?.id ? "Update Teacher" : "Create Teacher"}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default TeacherModal