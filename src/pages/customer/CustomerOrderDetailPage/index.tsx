import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import OrderInfo from './components/OrderInfo';
import useCustomerOrderDetailPage from './useCustomerOrderDetailPage';
import { ConfirmActions, DeliveryActions, RebuyActions } from './components/ActionGroup';
import { OrderStage } from '../../../types/enum/orderStage.enum';
import { OrderStageStatus } from '../../../types/enum/orderStageStatus.enum';
import DirectCancelModal from './components/DirectCancelModal';
import CancelRequestModal from './components/CancelRequestModal';
import { ReplyStatus } from '../../../types/enum/replyStatus.enum';
import CancelRequest from './components/CancelRequest';

const CustomerOrderDetail = () => {
  const {
    order,
    isModalOpen,
    setIsModalOpen,
    cancelReasons,
    openCancelModal,
    directCancel,
    receiveOrder,
    setDescription,
    cancelOrder,
    stages,
  } = useCustomerOrderDetailPage();
  const navigate = useNavigate();

  let actionGroup;
  let actionModal;
  switch (order?.orderStageID.name) {
    case OrderStage.Confirmating:
      actionGroup = <ConfirmActions openCancelModal={openCancelModal} />;
      actionModal = (
        <DirectCancelModal
          directCancel={directCancel}
          isModalOpen={isModalOpen}
          reasons={cancelReasons}
          setIsModalOpen={setIsModalOpen}
        />
      );
      break;
    case OrderStage.Picking:
      if (
        order.orderStageID.orderStageStatusID.status === OrderStageStatus.Active ||
        (order.orderStageID.orderStageStatusID.status === OrderStageStatus.RequestToSeller &&
          order.orderStageID.orderStageStatusID.orderRequestID?.replyStatus === ReplyStatus.Rejected)
      ) {
        actionGroup = <ConfirmActions openCancelModal={openCancelModal} />;
        actionModal = (
          <CancelRequestModal
            isModalOpen={isModalOpen}
            reasons={cancelReasons}
            setIsModalOpen={setIsModalOpen}
            cancelOrderRequest={cancelOrder}
            setDescription={setDescription}
          />
        );
      } else actionGroup = null;
      break;
    case OrderStage.Delivering:
      actionGroup = <DeliveryActions receiveOrder={receiveOrder} />;
      break;
    case OrderStage.Delivered:
      actionGroup = <RebuyActions />;
      break;
    case OrderStage.Cancelled:
      actionGroup = <RebuyActions />;
      break;
    default:
      actionGroup = null;
  }

  return (
    <div id="container">
      <div id="brief" className="px-12 py-5">
        <Flex align="center" justify="space-between">
          <Button
            variant="text"
            color="default"
            className="p-0 hover:bg-transparent"
            onClick={() => {
              navigate(-1);
            }}
          >
            <LeftOutlined /> Back
          </Button>
          <Flex gap={'middle'}>
            <Typography.Paragraph className="m-0 text-base">Order ID: {order?._id}</Typography.Paragraph>
            <Divider type="vertical" className="m-0" />
            <Typography.Paragraph className="m-0 text-base text-blue-500">
              {order?.orderStageID?.name}
            </Typography.Paragraph>
          </Flex>
        </Flex>
      </div>
      {/* <Divider className="m-0" />
      <TrackingOrder stages={stages} /> */}
      <Divider className="m-0" />
      {actionGroup}
      <Divider className="m-0" />
      <OrderInfo order={order} />
      {/* {order?.orderStageID.orderStageStatusID.orderRequestID?.replyStatus === ReplyStatus.Pending && (
        <CancelRequest order={order} />
      )} */}
      {order?.orderStageID.name !== (OrderStage.Delivered && OrderStage.Delivering) &&
        stages.find((item: any) => item.orderStageStatus.length > 1) && <CancelRequest stages={stages} />}
      {actionModal}
    </div>
  );
};

export default CustomerOrderDetail;
