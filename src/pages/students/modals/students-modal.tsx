import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect } from "react";
import type { ModalProps, StudentsType } from "@types";
import { useStudent } from "@hooks";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";

interface StudentProps extends ModalProps{
    update: StudentsType | null
}
dayjs.extend(customParseFormat);

const StudentsModal = ({ open, toggle, update }: StudentProps) => {
    console.log('salom');
    
    const { useStudentCreate, useStudentUpdate} = useStudent({page: 1, limit: 10});
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
        setValue('phone', update.phone);
        setValue('password_hash', update.password_hash);
        setValue('gender', update.gender);
        setValue('date_of_birth', update.date_of_birth);
        setValue('lidId', update.lidId!);
        setValue('eventsId', update.eventsId!);
    } else {
        reset();
    }
  }, [update, setValue, reset]);

  const onSubmit = (res: any) => {
    if (update?.id) {
        updateStudent({ ...res, id: update.id }, {
            onSuccess: () => {
                toggle();
                reset();
            },
            onError: (error) => {
                console.error("Error while updating student:", error);
            }
        });
    } else {
        createStudent(res, {
            onSuccess: () => {
                toggle();
                reset();
            },
            onError: (error) => {
                console.error("Error while adding student:", error);
            }
        });
    }
  };

  return (
    <Modal
        title={update?.id ? "Update Student" : "Add New Student"}
        centered
        open={open}
        onCancel={()=> {
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
                    render={({ field}) => (
                        <Input {...field} status={errors.first_name ? "error" : ""} placeholder="First Name" id="first_name" autoComplete="off"/>
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
                    render={({ field}) => (
                        <Input {...field} status={errors.last_name ? "error" : ""} placeholder="Last Name" id="last_name" autoComplete="off"/>
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
                    render={({ field}) => (
                        <Input {...field} status={errors.email ? "error" : ""} placeholder="Email" id="email" autoComplete="off"/>
                    )}
                />
            </Form.Item>   
            <Form.Item
                label="Phone"
                name="phone"
                validateStatus={errors.phone ? "error" : ""} 
                help={errors.phone && errors.phone?.message}    
            >
                <Controller
                    name="phone"
                    control={control}
                    render={({ field}) => (
                        <Input {...field} status={errors.phone ? "error" : ""} placeholder="Phone" id="phone" autoComplete="off"/>
                    )}
                />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password_hash"
                validateStatus={errors.password_hash ? "error" : ""} 
                help={errors.password_hash && errors.password_hash?.message}    
            >
                <Controller
                    name="password_hash"
                    control={control}
                    render={({ field}) => (
                        <Input.Password {...field} status={errors.password_hash ? "error" : ""} placeholder="Password" id="password_hash" autoComplete="off"/>
                    )}
                />
            </Form.Item>
            <Form.Item
                label="Gender"
                name="gender"
                validateStatus={errors.gender ? "error" : ""} 
                help={errors.gender && errors.gender?.message}    
            >
                <Controller
                    name="gender"
                    control={control}
                    render={({ field}) => (
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
                    render={({ field}) => (
                        <DatePicker {...field} status={errors.date_of_birth ? "error" : ""} placeholder="Date of Birth" id="date_of_birth" autoComplete="off"/>
                    )}
                />
            </Form.Item>
            {/* <Form.Item
                label="Lid"
                name='lid'

            >

            </Form.Item> */}
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