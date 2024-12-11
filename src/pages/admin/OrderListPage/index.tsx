import { TableProps, Typography, Table, Button } from 'antd';
import useOrderListPage from './useOrderListPage';
import { OrderProps } from '../../../types/order.type';
import { OrderStage } from '../../../types/enum/orderStage.enum';
import { OrderStageStatus } from '../../../types/enum/orderStageStatus.enum';
import { OrderRequestProps } from '../../../types/orderRequest.type';
import { ReplyStatus } from '../../../types/enum/replyStatus.enum';
import CancelModal from './components/CancelModal';
import { formattedName } from '../../../utils/formatName';
import { formattedCurrency } from '../../../utils/formattedCurrency';
import { formattedOrderStageStatus } from '../../../utils/formattedOrderStageStatus';

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
  createdAt: Date | undefined;
}

const OrderListPage = () => {
  const { orders, isModalOpen, setIsModalOpen, setReplyMessage, setRecord, record, processRequest } =
    useOrderListPage();

  const data: CustomTableColumns[] = orders?.map((order: OrderProps) => {
    return {
      orderID: order?._id,
      customerName: `${formattedName(order.userID)}`,
      storeName: order?.storeID?.name,
      products: order?.orderDetailIDs?.length,
      stage: order?.orderStageID?.name,
      stageStatus: order?.orderStageID?.orderStageStatusID?.status,
      total: order?.total,
      shipmentCost: order?.shipmentCost,
      orderRequest: order?.orderStageID?.orderStageStatusID?.orderRequestID,
      createdAt: order.createAt,
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
      responsive: ['xs', 'md'],
    },
    {
      title: 'Store Name',
      dataIndex: 'storeName',
      key: 'storeName',
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
      title: 'Order Stage',
      dataIndex: 'stage',
      key: 'satge',
      responsive: ['xs', 'md'],
    },
    {
      title: 'Status',
      dataIndex: 'stageStatus',
      key: 'stageStatus',
      responsive: ['xs', 'md'],
      render: (text: string, record) => {
        if (
          record.stageStatus === OrderStageStatus.RequestToAdmin &&
          record.orderRequest.replyStatus === ReplyStatus.Pending
        )
          return (
            <Button
              type="link"
              className="p-0"
              onClick={() => {
                setRecord(record);
                setIsModalOpen(true);
              }}
            >
              {formattedOrderStageStatus(text)}
            </Button>
          );
        else {
          return <>{text && formattedOrderStageStatus(text)}</>;
        }
      },
    },
    {
      title: 'Total Price',
      key: 'total',
      dataIndex: 'total',
      render: (text: number) => <>{formattedCurrency(text)}</>,
      responsive: ['xs', 'md'],
    },
    {
      title: 'Shipment Cost',
      key: 'shipmentCost',
      dataIndex: 'shipmentCost',
      render: (text: number) => <>{formattedCurrency(text)}</>,
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
      <CancelModal
        isModalOpen={isModalOpen}
        setDescription={setReplyMessage}
        setIsModalOpen={setIsModalOpen}
        record={record}
        processRequest={processRequest}
      />
    </div>
  );
};

export default OrderListPage;
