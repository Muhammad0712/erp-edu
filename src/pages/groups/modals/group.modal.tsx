import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Select, Input, Button, Form, DatePicker } from 'antd';
import type { Group, ModalProps } from '@types';
import { useCourses, useGroup } from '@hooks';
import { useForm, Controller } from "react-hook-form";
import { groupFormSchema } from '@utils';
import { useEffect } from "react";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';



dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';
interface GroupProps extends ModalProps {
  update: Group | null;
}

const GroupModal = ({ open, toggle, update }: GroupProps) => {
  const { data } = useCourses({ page: 1, limit: 10 });
  const { useGroupCreate, useGroupUpdate } = useGroup({ page: 1, limit: 10 });
  const createGroup = useGroupCreate();
  const updateGroupMutation = useGroupUpdate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(groupFormSchema),
    defaultValues: {
      name: '',
      course_id: undefined,
      status: '',
      start_date: '',
      end_date: '',
    }
  });

  useEffect(() => {
    if (update?.id) {
      setValue('name', update.name);
      setValue('course_id', update.course_id);
      setValue('start_date', update.start_date);
      setValue('end_date', update.end_date);
      setValue('status', update.status);
    } else {
      reset();
    }
  }, [update, setValue, reset]);

  const onSubmit = (data: any) => {
    if (update?.id) {
      updateGroupMutation.mutate({ ...data, id: update.id }, {
        onSuccess: () => {
          toggle();
          reset();
        },
        onError: (error) => {
          console.error("Error while updating group:", error);
        }
      });
    } else {
      createGroup.mutate(data, {
        onSuccess: () => {
          toggle();
          reset();
        },
        onError: (error) => {
          console.error("Error while adding group:", error);
        }
      });
    }
  };

  return (
    <Modal
      title={update?.id ? "Update group" : "Create group"}
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
          label="Name"
          name="name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name ? errors.name.message : ""}
          htmlFor="name"
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} status={errors.name ? "error" : ""} placeholder="Group name" id="name" autoComplete="off"/>
            )}
          />
        </Form.Item>
        {/*SHU YERGA KELDIM  */}
        <Form.Item
          label="Course"
          name="course_id"
          htmlFor="course_id"
          validateStatus={errors.course_id ? "error" : ""}
          help={errors.course_id ? errors.course_id.message : ""}
        >
          <Controller
            name="course_id"
            control={control}
            render={({ field }) => (  
              <Select
                id="course_id"
                {...field}
                showSearch
                status={errors.course_id ? 'error' : ''}
                placeholder="Select a course"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={data?.data?.courses.map((course: any) => ({
                  value: course.id,
                  label: course.title
                }))}
              />
            )}
          />
        </Form.Item>
        <div className="w-[100%] flex justify-between">
          <Form.Item name="start_date" label="Start date" style={{ width: "40%" }}>
            <DatePicker 
              name="start_date"
              style={{ width: "100%" }} 
              onChange={(value) => setValue("start_date", value?.format(dateFormat))}
              minDate={dayjs('2023-01-01')} 
            />
          </Form.Item>
          <Form.Item name="end_date" label="End date" style={{ width: "40%" }}>
            <DatePicker 
              name="end_date" 
              style={{width: "100%"}}
              onChange={(value) => setValue("end_date", value?.format(dateFormat))}
            />
          </Form.Item>
        </div>
        <Form.Item
          label="Status"
          name="status"
          validateStatus={errors.status ? "error" : ""}
          help={errors.status ? errors.status.message : ""}
          htmlFor="status"
        >
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select a status"
                status={errors.status ? "error" : ""}
                id="status"
                options={[
                  { value: "active", label: "Active" },
                  { value: "new", label: "New" },
                  { value: "completed", label: "Completed" },
                ]}
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={createGroup.isPending || updateGroupMutation.isPending}
          >
            {update?.id ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GroupModal;