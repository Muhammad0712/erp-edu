import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Input, Form, Button, InputNumber } from 'antd';
import type { BranchesType, ModalProps } from '@types';
import { useBranches } from '@hooks';
import { useForm, Controller } from "react-hook-form";
import { branchFormSchema } from '@utils';
import { useEffect } from "react";


interface BranchProps extends ModalProps {
  update: BranchesType | null;
}

const BranchModal = ({ open, toggle, update }: BranchProps) => {

  const {useBranchesCreate, useBranchesUpdate} = useBranches();
  const { mutate: createFn, isPending: isCreating } = useBranchesCreate();
  const { mutate: updateFn, isPending: isUpdating } = useBranchesUpdate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(branchFormSchema),
    defaultValues: {
      name: '',
      address: '',
      call_number: ''
    }
  });

  useEffect(() => {
    if (update?.id) {
      setValue('name', update.name);
      setValue('address', update.address);
      setValue('call_number', update.call_number.split('+998')[1]);
    } else {
      reset();
    }
  }, [update, setValue, reset]);

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      call_number: `+998${data.call_number}`
    };
    console.log(formattedData, 'formattedData');
    if (update?.id) {
      updateFn({data: formattedData, id: update.id}, {
        onSuccess: () => {
          toggle();
          reset();
        }
      });
    } else {
      createFn(formattedData, {
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

  return (
    <Modal
      title={update?.id ? "Update Branch" : "Create Branch"}
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
          label="Branch Name"
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
                placeholder="Enter branch name"
                id="name"
                autoComplete="off"
              />
            )}
          />
        </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            validateStatus={errors.address ? "error" : ""}
            help={errors.address ? errors.address.message : ""}
            htmlFor="address"
            style={{ flex: 1 }}
          >
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  status={errors.address ? "error" : ""}
                  placeholder="Enter address"
                  id="address"
                  autoComplete="off"
                />
              )}
            />
          </Form.Item>

        <Form.Item
          label="Call Number"
          validateStatus={errors.call_number ? 'error' : ""}
          help={errors.call_number?.message}
          style={{ flex: 1 }}
        >
          <Controller
            name="call_number"
            control={control}
            render={({ field }) => (
              <InputNumber
                style={{ width: '100%' }}
                {...field}
                status={errors.call_number ? 'error' : ""}
                placeholder="Call Number"
                size="large"
                addonBefore="+998"
                controls={false}
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

export default BranchModal;