import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Input, Form, Button } from 'antd';
import type { BranchesType, ModalProps } from '@types';
import { useBranches } from '@hooks';
import { useForm, Controller } from "react-hook-form";
import { branchFormSchema } from '@utils';
import { useEffect } from "react";
import { IMaskInput } from "react-imask";


interface BranchProps extends ModalProps {
  update: BranchesType | null;
}

const BranchModal = ({ open, toggle, update }: BranchProps) => {

  const { useBranchesCreate, useBranchesUpdate } = useBranches();
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

  console.log(update, 'update');
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
    console.log(data, 'formattedData');
    if (update?.id) {
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
            name='call_number'
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