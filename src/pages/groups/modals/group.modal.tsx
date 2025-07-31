import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Select, Input, Button, Form, DatePicker, TimePicker, message } from 'antd';
import type { GroupsType, ModalProps, RoomsType } from '@types';
import { useCourses, useGroup, useRooms } from '@hooks';
import { useForm, Controller } from "react-hook-form";
import { groupFormSchema } from '@utils';
import { useEffect, useMemo, useCallback } from "react";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm';

interface GroupProps extends ModalProps {
  update: GroupsType | null;
}

const GroupModal = ({ open, toggle, update }: GroupProps) => {
  const { data: courses } = useCourses();
  const { data: rooms } = useRooms();
  console.log(update);

  const { useGroupCreate, useGroupUpdate } = useGroup({ page: 1, limit: 10 });
  const { mutate: createGroup, isPending: isCreating } = useGroupCreate();
  const { mutate: updateGroup, isPending: isUpdating } = useGroupUpdate();

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
      courseId: undefined,
      status: '',
      start_date: '',
      start_time: '',
      roomId: undefined
    }
  });

  // Memoized options - qayta render qilishni oldini olish uchun
  const courseOptions = useMemo(() =>
    courses?.data?.courses?.map((course: any) => ({
      value: course.id,
      label: course.title
    })) || []
    , [courses?.data?.courses]);

  const roomOptions = useMemo(() =>
    rooms?.data?.rooms?.map((room: RoomsType) => ({
      value: room.id,
      label: room.name
    })) || []
    , [rooms?.data?.rooms]);

  const statusOptions = useMemo(() => [
    { value: "active", label: "Active" },
    { value: "new", label: "New" },
    { value: "completed", label: "Completed" },
  ], []);

  // Optimized form update
  useEffect(() => {
    if (update?.id) {
      const formData = {
        name: update.name,
        courseId: update.course?.id,
        start_date: update.start_date,
        start_time: update.start_time?.substring(0, 5),
        status: update.status,
        roomId: update.roomId
      };

      Object.entries(formData).forEach(([key, value]) => {
        setValue(key as any, value);
      });
    } else {
      reset();
    }
  }, [update, setValue, reset]);

  // Memoized callbacks
  const onSubmit = useCallback((data: any) => {
    const commonCallbacks = {
      onSuccess: () => {
        toggle();
        reset();
      },
      onError: (error: any) => {
        message.error(
          error?.response?.data?.message ||
          error?.message ||
          `Failed to ${update?.id ? 'update' : 'create'} group`
        );
      }
    };

    if (update?.id) {
      updateGroup({ data, id: update.id }, commonCallbacks);
    } else {
      createGroup(data, commonCallbacks);
    }
  }, [update?.id, createGroup, updateGroup, toggle, reset]);

  const handleCancel = useCallback(() => {
    toggle();
    reset();
  }, [toggle, reset]);

  const handleDateChange = useCallback((date: any, field: any) => {
    const formattedDate = date ? date.format(dateFormat) : '';
    field.onChange(formattedDate);
    setValue("start_date", formattedDate);
  }, [setValue]);

  const handleTimeChange = useCallback((time: any, field: any) => {
    const formattedTime = time ? time.format(timeFormat) : '';
    field.onChange(formattedTime);
    setValue("start_time", formattedTime);
  }, [setValue]);

  // Filter sort function - memoized
  const filterSort = useCallback((optionA: any, optionB: any) =>
    (optionA?.label ?? "")
      .toLowerCase()
      .localeCompare((optionB?.label ?? "").toLowerCase())
    , []);

  const isLoading = isCreating || isUpdating;

  return (
    <Modal
      title={update?.id ? "Update Group" : "Create Group"}
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
        <Form.Item
          label="Group Name"
          name="name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
          htmlFor="name"
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                status={errors.name ? "error" : ""}
                placeholder="Enter group name"
                id="name"
                autoComplete="off"
              />
            )}
          />
        </Form.Item>

        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item
            label="Course"
            name="courseId"
            htmlFor="courseId"
            validateStatus={errors.courseId ? "error" : ""}
            help={errors.courseId?.message}
            style={{ flex: 1 }}
          >
            <Controller
              name="courseId"
              control={control}
              render={({ field }) => (
                <Select
                  id="courseId"
                  {...field}
                  showSearch
                  status={errors.courseId ? 'error' : ''}
                  placeholder="Select a course"
                  optionFilterProp="label"
                  filterSort={filterSort}
                  options={courseOptions}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            validateStatus={errors.status ? "error" : ""}
            help={errors.status?.message}
            htmlFor="status"
            style={{ flex: 1 }}
          >
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select status"
                  status={errors.status ? "error" : ""}
                  id="status"
                  options={statusOptions}
                />
              )}
            />
          </Form.Item>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item
            name="start_date"
            label="Start Date"
            htmlFor="start_date"
            validateStatus={errors.start_date ? "error" : ""}
            help={errors.start_date?.message}
            style={{ flex: 1 }}
          >
            <Controller
              name="start_date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  id="start_date"
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  style={{ width: "100%" }}
                  placeholder="Select start date"
                  onChange={(date) => handleDateChange(date, field)}
                  minDate={dayjs('2023-01-01')}
                  status={errors.start_date ? "error" : ""}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            name="start_time"
            label="Start Time"
            htmlFor="start_time"
            validateStatus={errors.start_time ? "error" : ""}
            help={errors.start_time?.message}
            style={{ flex: 1 }}
          >
            <Controller
              name="start_time"
              control={control}
              render={({ field }) => (
                <TimePicker
                  id="start_time"
                  {...field}
                  value={field.value ? dayjs(field.value, timeFormat) : null}
                  format={timeFormat}
                  style={{ width: "100%" }}
                  placeholder="Select start time"
                  onChange={(time) => handleTimeChange(time, field)}
                  needConfirm
                  status={errors.start_time ? "error" : ""}
                />
              )}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="roomId"
          label="Room"
          validateStatus={errors.roomId ? "error" : ""}
          help={errors.roomId?.message}
          htmlFor="roomId"
        >
          <Controller
            name="roomId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                id="roomId"
                placeholder="Select a room"
                status={errors.roomId ? "error" : ""}
                showSearch
                optionFilterProp="label"
                options={roomOptions}
              />
            )}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, marginTop: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Button
              onClick={handleCancel}
              disabled={isLoading}  
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              {update?.id ? "Update Group" : "Create Group"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GroupModal;