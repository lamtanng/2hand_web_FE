import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import OrderInfo from './components/OrderInfo';
import useStoreOrderDetailPage from './userStoreOrderDetailPage';
import { ConfirmActions, DeliveryActions } from './components/ActionGroup';
import PickupDateModal from './components/PickupDateModal';
import { OrderStage } from '../../../types/enum/orderStage.enum';
import { OrderStageStatus } from '../../../types/enum/orderStageStatus.enum';
import DirectCancelModal from './components/DirectCancelModal';
import CancelRequest from './components/CancelRequest';
import { ReplyStatus } from '../../../types/enum/replyStatus.enum';

const StoreOrderDetail = () => {
  const {
    order,
    pickupDates,
    pickingOrder,
    deliveringOrder,
    isLoading,
    confirmOrder,
    cancelReasons,
    openCancelModal,
    directCancel,
    isCancelModalOpen,
    isPickupModalOpen,
    setIsCancelModalOpen,
    setIsPickupModalOpen,
    stages,
  } = useStoreOrderDetailPage();
  const navigate = useNavigate();

  let actionGroup;
  switch (order?.orderStageID.name) {
    case OrderStage.Confirmating:
      actionGroup = <ConfirmActions getPickupDate={pickingOrder} openCancelModal={openCancelModal} />;
      break;
    case OrderStage.Picking:
      if (
        order.orderStageID.orderStageStatusID.status === OrderStageStatus.Active ||
        order.orderStageID.orderStageStatusID.orderRequestID?.replyStatus === ReplyStatus.Rejected
      )
        actionGroup = <DeliveryActions deliveringOrder={deliveringOrder} isLoading={isLoading} />;
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
      <Divider className="m-0" />
      {actionGroup}
      <Divider className="m-0" />
      <OrderInfo order={order} />
      {order?.orderStageID.name !== (OrderStage.Delivered && OrderStage.Delivering) &&
        stages.find((item: any) => item.orderStageStatus.length > 1) && <CancelRequest stages={stages} order={order} />}
      <PickupDateModal
        isModalOpen={isPickupModalOpen}
        setIsModalOpen={setIsPickupModalOpen}
        pickupDates={pickupDates}
        confirmOrder={confirmOrder}
      />
      <DirectCancelModal
        directCancel={directCancel}
        isModalOpen={isCancelModalOpen}
        reasons={cancelReasons}
        setIsModalOpen={setIsCancelModalOpen}
      />
    </div>
  );
};

export default StoreOrderDetail;
