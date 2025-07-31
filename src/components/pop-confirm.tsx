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
      title=""
      okText="Delete"
      cancelText="Cancel"
      okButtonProps={{
        danger: true,
        loading: loading
      }}
      cancelButtonProps={{
        disabled: loading
      }}
    >
      <p>Are you sure you want to delete this item?</p>
    </Modal>
  );
};

export default PopConfirm