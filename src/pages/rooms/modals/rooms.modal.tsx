import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Input, Form, Button, Select } from 'antd';
import type { BranchesType, ModalProps, RoomsType } from '@types';
import { useBranches, useRooms } from '@hooks';
import { useForm, Controller } from "react-hook-form";
import { roomFormSchema } from '@utils';
import { useEffect } from "react";


interface RoomsProps extends ModalProps {
  update: RoomsType | null;
}

const RoomModal = ({ open, toggle, update }: RoomsProps) => {
  // Rooms data
  const { useRoomsCreate, useRoomsUpdate } = useRooms();
  const { mutate: createFn, isPending: isCreating } = useRoomsCreate();
  const { mutate: updateFn, isPending: isUpdating } = useRoomsUpdate();

  // Branches data
  const { data: branches } = useBranches();
  console.log(branches?.data.branch);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(roomFormSchema),
    defaultValues: {
      branchId: undefined,
      name: '',
      capacity: undefined,
    }
  });

  useEffect(() => {
    if (update?.id) {
      setValue('branchId', update.branchId);
      setValue('name', update.name);
      setValue('capacity', update.capacity);
    } else {
      reset();
    }
  }, [update, setValue, reset]);

  const onSubmit = (data: any) => {
    const mutationConfig = {
      onSuccess: () => {
        toggle();
        reset();
      }
    };

    if (update?.id) {
      updateFn({ data: data , id: update.id }, mutationConfig);
    } else {
      createFn(data, mutationConfig);
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
      title={update?.id ? "Update Room" : "Create Room"}
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
          label="Room Name"
          name="name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name ? errors.name.message : ""}
          htmlFor="name"
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                status={errors.name ? "error" : ""}
                placeholder="Enter room name"
                id="name"
                autoComplete="off"
              />
            )}
          />
        </Form.Item>
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
                placeholder="Select branch"
                options={branchOptions}
                status={fieldState.error ? "error" : ""}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Capacity"
          name="capacity"
          validateStatus={errors.capacity ? "error" : ""}
          help={errors.capacity?.message}
          htmlFor="capacity"
        >
          <Controller
            name="capacity"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                status={errors.capacity ? "error" : ""}
                placeholder="Enter capacity"
                id="capacity"
                autoComplete="off"
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isCreating || isUpdating}>
            {update?.id ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoomModal;