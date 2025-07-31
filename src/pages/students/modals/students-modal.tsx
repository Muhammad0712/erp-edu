import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect } from "react";
import type { ModalProps, StudentsType } from "@types";
import { useStudent } from "@hooks";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { IMaskInput } from 'react-imask';

interface StudentProps extends ModalProps {
    update: StudentsType | null
}
dayjs.extend(customParseFormat);

const StudentsModal = ({ open, toggle, update }: StudentProps) => {

    const { useStudentCreate, useStudentUpdate } = useStudent({ page: 1, limit: 10 });
    const { mutate: createStudent } = useStudentCreate();
    const { mutate: updateStudent } = useStudentUpdate();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            password_hash: '',
            confirm_password: '',
            gender: '',
            date_of_birth: '',
            lidId: NaN,
            eventsId: NaN
        }
    });
    useEffect(() => {
        if (update?.id) {
            setValue('first_name', update.first_name);
            setValue('last_name', update.last_name);
            setValue('email', update.email);
            setValue('phone', update.phone?.replace('+998', ''));
            setValue('gender', update.gender);
            setValue('date_of_birth', update.date_of_birth);
            setValue('lidId', update.lidId!);
            setValue('eventsId', update.eventsId!);
        } else {
            reset();
        }
    }, [update, setValue, reset]);

    const onSubmit = (data: StudentsType) => {
        const formattedData = {
            ...data,
            phone: `+998${data.phone}`
        };
        delete formattedData.password_hash;
        delete formattedData.confirm_password;

        if (update?.id) {
            updateStudent({ data: formattedData, id: update.id }, {
                onSuccess: () => {
                    toggle();
                    reset();
                }
            });
        } else {
            createStudent(formattedData, {
                onSuccess: () => {
                    toggle();
                    reset();
                }
            });
        }
    };

    return (
        <Modal
            title={update?.id ? "Update Student" : "Add New Student"}
            centered
            open={open}
            onCancel={() => {
                toggle();
                reset();
            }}
            width={500}
            closeIcon
            footer={null}
        >
            <Form
                layout="vertical"
                autoComplete="on"
                onFinish={handleSubmit(onSubmit)}
            >
                <Form.Item
                    label="First Name"
                    name="first_name"
                    validateStatus={errors.first_name ? "error" : ""}
                    help={errors.first_name && errors.first_name?.message}
                    htmlFor="first_name"
                >
                    <Controller
                        name="first_name"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} status={errors.first_name ? "error" : ""} placeholder="First Name" id="first_name" autoComplete="off" />
                        )}
                    />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="last_name"
                    validateStatus={errors.last_name ? "error" : ""}
                    help={errors.last_name && errors.last_name?.message}
                >
                    <Controller
                        name="last_name"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} status={errors.last_name ? "error" : ""} placeholder="Last Name" id="last_name" autoComplete="off" />
                        )}
                    />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    validateStatus={errors.email ? "error" : ""}
                    help={errors.email && errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} status={errors.email ? "error" : ""} placeholder="Email" id="email" autoComplete="off" />
                        )}
                    />
                </Form.Item>
                <Form.Item
                    label="Phone"
                    validateStatus={errors.phone ? 'error' : ""}
                    help={errors.phone?.message}
                    style={{ flex: 1 }}
                >
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            // <InputNumber
                            // style={{ width: '100%' }}
                            // {...field}
                            // status={errors.phone ? 'error' : ""}
                            // placeholder="Phone"
                            // addonBefore="+998"
                            // controls={false}
                            // />
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
                {!update?.id &&
                    <>
                        <Form.Item
                            label="Password"
                            name="password_hash"
                            validateStatus={errors.password_hash ? "error" : ""}
                            help={errors.password_hash && errors.password_hash?.message}
                        >
                            <Controller
                                name="password_hash"
                                control={control}
                                render={({ field }) => (
                                    <Input.Password {...field} status={errors.password_hash ? "error" : ""} placeholder="Password" id="password_hash" autoComplete="off" />
                                )} 
                            />
                        </Form.Item>
                        <Form.Item
                            label="Confirm Password"
                            name="confirm_password"
                            validateStatus={errors.confirm_password ? "error" : ""}
                            help={errors.confirm_password && errors.confirm_password?.message}
                        >
                            <Controller
                                name="confirm_password"
                                control={control}
                                render={({ field }) => (
                                    <Input.Password {...field} status={errors.confirm_password ? "error" : ""} placeholder="Confirm Password" id="confirm_password" autoComplete="off" />
                                )} />
                        </Form.Item>
                    </>
                }
                <Form.Item
                    label="Gender"
                    name="gender"
                    validateStatus={errors.gender ? "error" : ""}
                    help={errors.gender && errors.gender?.message}
                >
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} status={errors.gender ? "error" : ""} placeholder="Gender" id="gender">
                                <Select.Option value="male">Male</Select.Option>
                                <Select.Option value="female">Female</Select.Option>
                            </Select>
                        )}
                    />
                </Form.Item>
                <Form.Item
                    label="Date of Birth"
                    name="date_of_birth"
                    validateStatus={errors.date_of_birth ? "error" : ""}
                    help={errors.date_of_birth && errors.date_of_birth?.message}
                >
                    <Controller
                        name="date_of_birth"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                value={field.value ? dayjs(field.value) : null}
                                onChange={(val) => field.onChange(val)}
                                status={errors.date_of_birth ? "error" : ""}
                                placeholder="Date of Birth"
                                id="date_of_birth"
                                autoComplete="off" />

                        )}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        {update?.id ? "Update" : "Add"}
                    </Button>
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default StudentsModal