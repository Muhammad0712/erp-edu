import { DeleteOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'
interface Props {
  handleDelete: () => void,
  loading?: boolean,
}

const PopConfirm = ({ handleDelete, loading }: Props) => {
  return (
    <>
      
      <Popconfirm
        title="Delete the item"
        description="Are you sure to delete this item?"
        okText="Yes"
        cancelText="No"
        disabled={loading}
        onConfirm={handleDelete}
      >
        <Button type="primary" danger onClick={handleDelete}>
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    </>
  )
}

export default PopConfirm