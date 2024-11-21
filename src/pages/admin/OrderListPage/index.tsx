import { TableProps, Typography, Table } from 'antd';

export interface CustomTableColumns {
  orderID: string;
  customerName: string;
  storeName: string;
  products: number;
  status: string;
  total: number;
}

const data = [
  {
    orderID: 'id',
    customerName: 'Customer Name',
    storeName: 'Store Name',
    products: 2,
    status: 'Waiting for confirmation',
    total: 100000,
  },
];

const OrderListPage = () => {
  const columns: TableProps['columns'] = [
    {
      title: 'Order ID',
      key: 'orderID',
      dataIndex: 'orderID',
      width: '10%',
      responsive: ['xs', 'md'],
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      width: '10%',
      responsive: ['xs', 'md'],
    },
    {
      title: 'Store Name',
      dataIndex: 'storeName',
      key: 'storeName',
      width: '10%',
      responsive: ['xs', 'md'],
    },
    {
      title: 'Number of products',
      dataIndex: 'products',
      key: 'products',
      width: '10%',
      responsive: ['xs', 'md'],
    },
    {
      title: 'Order Status',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      responsive: ['xs', 'md'],
    },
    {
      title: 'Total Price',
      key: 'total',
      dataIndex: 'total',
      width: '10%',
      render: (text: number) => <>{Intl.NumberFormat().format(text)} VND</>,
      responsive: ['xs', 'md'],
    },
  ];
  return (
    <div>
      <div className="mb-6 rounded-xl bg-white p-8 shadow-sm">
        <Typography.Title level={2} className="m-0 mb-2">
          Order List
        </Typography.Title>
      </div>
      <Table dataSource={data} columns={columns} scroll={{ x: 'max-content' }} />
    </div>
  );
};

export default OrderListPage;
