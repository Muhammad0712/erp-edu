import { Modal } from "antd";

interface Props {
  openPop: boolean,
  setOpenPop: (open: boolean) => void,
  handleDelete: () => void,
  loading?: boolean,
}

const PopConfirm = ({ openPop, setOpenPop, handleDelete, loading }: Props) => {
  return (
    <Modal
      open={openPop}
      onCancel={() => setOpenPop(false)}
      onOk={handleDelete}
      title="O'chirishni tasdiqlang"
      okText="Ha, o'chirish"
      cancelText="Bekor qilish"
      okButtonProps={{
        danger: true,
        loading: loading
      }}
      cancelButtonProps={{
        disabled: loading
      }}
    >
      <p>Ushbu elementni o'chirishni tasdiqlaysizmi?</p>
    </Modal>
  );
};

export default PopConfirm