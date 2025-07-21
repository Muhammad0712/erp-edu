import type { ModalProps, TeacherType } from '@types'
import { useTeachers } from '@hooks'
import { useForm, Controller } from 'react-hook-form'
import { teacherFormSchema } from '@utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { Form, Input, Modal } from 'antd'

interface TeacherProps extends ModalProps {
    update: TeacherType | null
}
const TeacherModal = ({open, toggle, update}: TeacherProps) => {

    const { useTeacherCreate} = useTeachers();
    const { mutate: createFn} = useTeacherCreate();
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

    const onSubmit = (data: any)=> {
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

  return (
    <>
        <Modal
            title={update?.id ? "Update Teacher" : "Create Teacher"}
            centered
            open={open}
            onCancel={()=> {
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
                    validateStatus={errors.first_name ?'error' : ""}
                    help={errors.first_name? errors.first_name.message : ""}
                    htmlFor='first_name'
                >
                    <Controller
                        name='first_name'
                        control={control}
                        render={({ field }) => {
                            return <Input {...field} status={errors.first_name ?'error' : ""} placeholder='First Name' id='first_name' autoComplete='off'/>
                        }}
                    
                    />
                </Form.Item>
            </Form>
        </Modal>
    </>
  )
}

export default TeacherModal