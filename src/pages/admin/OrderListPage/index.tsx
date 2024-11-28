import { TableProps, Typography, Table } from 'antd';
import useOrderListPage from './useOrderListPage';
import { OrderProps } from '../../../types/order.type';
import { OrderStage } from '../../../types/enum/orderStage.enum';

export interface CustomTableColumns {
  orderID: string;
  customerName: string | undefined;
  storeName: string | undefined;
  products: number;
  stage: OrderStage;
  total: number;
  shipmentCost: number;
}

const OrderListPage = () => {
  const { orders } = useOrderListPage();

  const data: CustomTableColumns[] = orders.map((order: OrderProps) => {
    const name = (order.userID) ? order.userID.firstName : 'Anonymous'
    return {
      orderID: order._id,
      customerName: name,
      storeName: order.storeID.name,
      products: order.orderDetailIDs.length,
      stage: order.orderStageID.name,
      total: order.total,
      shipmentCost: order.shipmentCost,
    };
  });

  const columns: TableProps['columns'] = [
    {
      title: 'Order ID',
      key: 'orderID',
      dataIndex: 'orderID',
      width: '5%',
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
      width: '5%',
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
      width: '5%',
      render: (text: number) => <>{Intl.NumberFormat().format(text)} VND</>,
      responsive: ['xs', 'md'],
    },
    {
      title: 'Shipment Cost',
      key: 'shipmentCost',
      dataIndex: 'shipmentCost',
      width: '5%',
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
