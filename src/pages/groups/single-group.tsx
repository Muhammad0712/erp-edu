import { useGroup } from '@hooks'
import { Table } from 'antd';
import { useState } from 'react';
interface Props {
  groupId: number
}

const SingleGroup = ({groupId}: Props) => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10
  });
  const { students } = useGroup(params, groupId);

  const columns = [
    {}
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={students?.data.data}
        rowKey={(row) => row.id!}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: students?.data.total,
          showSizeChanger: true,
          pageSizeOptions: ["4", "5", "6", "7", "10"],
        }}
        style={{
          width: "100%",
        }}
        onChange={handleTableChange}
      />
    </>
  )
}

export default SingleGroup