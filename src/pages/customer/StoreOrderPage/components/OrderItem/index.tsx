import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ConfirmActions, DeliveryActions } from '../ActionGroup';
import PickupDateModal from '../PickupDateModal';
import useOrderItem from './useOrderItem';
import { OrderDetailProps } from '../../../../../types/orderDetail.type';
import { OrderProps } from '../../../../../types/order.type';
import { OrderStage } from '../../../../../types/enum/orderStage.enum';
import { OrderStageStatus } from '../../../../../types/enum/orderStageStatus.enum';
import DirectCancelModal from '../DirectCancelModal';
import dayjs from 'dayjs';
import { ReplyStatus } from '../../../../../types/enum/replyStatus.enum';
import OrderDetail from '../OrderDetail';
import { formattedCurrency } from '../../../../../utils/formattedCurrency';
import { formattedOrderStageStatus } from '../../../../../utils/formattedOrderStageStatus';

const StoreOrderItem = ({ order }: { order: OrderProps }) => {
  const {
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
  } = useOrderItem(order);
  let actionGroup;

  switch (order.orderStageID.name) {
    case OrderStage.Confirmating:
      actionGroup = <ConfirmActions getPickupDate={pickingOrder} openCancelModal={openCancelModal} />;
      break;
    case OrderStage.Picking:
      if (
        order.orderStageID.orderStageStatusID.status === OrderStageStatus.Active ||
        order.orderStageID.orderStageStatusID.orderRequestID?.replyStatus === ReplyStatus.Rejected
      )
        actionGroup = <DeliveryActions deliveringOrder={deliveringOrder} isLoading={isLoading} />;
      else
        actionGroup = (
          <Flex vertical gap={'large'}>
            <Link to={order._id}>
              Cancel request ({formattedOrderStageStatus(order.orderStageID.orderStageStatusID.status)}):{' '}
              {order.orderStageID.orderStageStatusID.orderRequestID?.reasonID.name}
            </Link>
          </Flex>
        );
      break;
    default:
      actionGroup = null;
  }

  return (
    <div className="mb-6">
      <div id="order" className="rounded-md bg-slate-50 p-6">
        <div id="order-summary">
          <Flex justify="space-between">
            <Flex id="shop-info" align="center" gap={'small'} className="w-1/3">
              <Avatar size="large" src={order.userID.avatar} icon={<UserOutlined />} />
              <Typography.Title level={5} className="m-0 inline truncate">
                {`${order.userID.firstName} ${order.userID.lastName}`}
              </Typography.Title>
              {/* <Button type="primary" className="px-2 py-1 text-xs">
                <MessageOutlined /> Chat
              </Button> */}
            </Flex>
            <div id="order-status">
              <p className="m-0 font-sans text-blue-700">{order?.orderStageID?.name && order.orderStageID.name}</p>
            </div>
          </Flex>
        </div>
        <Divider className="m-0 mt-6" />
        {order.orderDetailIDs.map((item: OrderDetailProps) => (
          <OrderDetail item={item} order={order} />
        ))}
        <Divider />
        <div id="total-price">
          <Flex justify="end" align="center" gap={'middle'}>
            <p className="m-0 font-sans">Total price:</p>
            <p className="m-0 font-sans text-xl text-blue-700">{formattedCurrency(order.total + order.shipmentCost)}</p>
          </Flex>
        </div>
        <Flex
          justify={order.orderStageID.name !== OrderStage.Cancelled ? 'space-between' : 'end'}
          align="center"
          className="mt-6"
        >
          {order.orderStageID.name === OrderStage.Cancelled ? null : (
            <Typography.Paragraph className="m-0">
              {order.orderStageID.name !== OrderStage.Delivered && 'Expected'} {order.orderStageID.name} Date:{' '}
              {order &&
                order.orderStageID.orderStageStatusID.expectedDate &&
                dayjs(order.orderStageID.orderStageStatusID.expectedDate.toString()).format('DD/MM/YYYY')}
            </Typography.Paragraph>
          )}
          {actionGroup}
        </Flex>
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
    </div>
  );
};

export default StoreOrderItem;
