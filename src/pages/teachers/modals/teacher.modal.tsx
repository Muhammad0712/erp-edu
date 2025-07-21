import type { ModalProps, TeacherType } from '@types'
import { useTeachers } from '@hooks'
import { useForm } from 'react-hook-form'
import { teacherFormSchema } from '@utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { Form, Modal } from 'antd'

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
                
            </Form>
        </Modal>
    </>
  )
}

export default TeacherModal