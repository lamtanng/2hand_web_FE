import { TableProps, Typography, Table } from 'antd';
import useOrderListPage from './useOrderListPage';
import { OrderProps } from '../../../types/order.type';
import { OrderStage } from '../../../types/enum/orderStage.enum';
import { OrderStageStatus } from '../../../types/enum/orderStageStatus.enum';
import { OrderRequestProps } from '../../../types/orderRequest.type';

export interface CustomTableColumns {
  orderID: string;
  customerName: string | undefined;
  storeName: string | undefined;
  products: number;
  stage: OrderStage;
  stageStatus: OrderStageStatus;
  total: number;
  shipmentCost: number;
  orderRequest?: OrderRequestProps;
}

const OrderListPage = () => {
  const { orders } = useOrderListPage();

  const data: CustomTableColumns[] = orders?.map((order: OrderProps) => {
    return {
      orderID: order?._id,
      customerName: order?.userID?.firstName,
      storeName: order?.storeID?.name,
      products: order?.orderDetailIDs?.length,
      stage: order?.orderStageID?.name,
      stageStatus: order?.orderStageID?.orderStageStatusID?.status,
      total: order?.total,
      shipmentCost: order?.shipmentCost,
      orderRequest: order?.orderStageID?.orderStageStatusID?.orderRequestID,
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
      title: 'Order Stage',
      dataIndex: 'stage',
      key: 'satge',
      width: '5%',
      responsive: ['xs', 'md'],
    },
    {
      title: 'Status',
      dataIndex: 'stageStatus',
      key: 'stageStatus',
      width: '5%',
      responsive: ['xs', 'md'],
      render: (text: string) => <>{text}</>,
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
