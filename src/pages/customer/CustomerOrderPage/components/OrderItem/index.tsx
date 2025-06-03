import { MessageOutlined, ShopOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Typography } from 'antd';
import { ConfirmActions, DeliveryActions, RebuyActions } from '../ActionGroup';
import OrderDetail from '../OrderDetail';
import { OrderDetailProps } from '../../../../../types/orderDetail.type';
import { OrderProps } from '../../../../../types/order.type';
import { OrderStage } from '../../../../../types/enum/orderStage.enum';
import { OrderStageStatus } from '../../../../../types/enum/orderStageStatus.enum';
import useOrderItem from './useOrderItem';
import DirectCancelModal from '../DirectCancelModal';
import CancelRequestModal from '../CancelRequestModal';
import dayjs from 'dayjs';
import { ReplyStatus } from '../../../../../types/enum/replyStatus.enum';
import { Link } from 'react-router-dom';
import { formattedCurrency } from '../../../../../utils/formattedCurrency';
import { formattedOrderStageStatus } from '../../../../../utils/formattedOrderStageStatus';
import ReturnModal from '../ReturnModal';

const CustomerOrderItem = ({ order }: { order: OrderProps }) => {
  const { receiveOrder, cancelReasons, isModalOpen, setIsModalOpen, openCancelModal, cancelOrder, setDescription, rebuyProduct } =
    useOrderItem(order);
  let actionGroup;
  let actionModal;
  switch (order.orderStageID.name) {
    case OrderStage.Confirmating:
      actionGroup = <ConfirmActions openCancelModal={openCancelModal} />;
      actionModal = (
        <DirectCancelModal
          isModalOpen={isModalOpen}
          reasons={cancelReasons}
          setIsModalOpen={setIsModalOpen}
          directCancel={cancelOrder}
          setDescription={setDescription}
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
      }
      if (order.orderStageID.orderStageStatusID.orderRequestID?.replyStatus === ReplyStatus.Pending) {
        actionGroup = (
          <Link to={order._id}>
            Cancel request ({formattedOrderStageStatus(order.orderStageID.orderStageStatusID.status)}):{' '}
            {order.orderStageID.orderStageStatusID.orderRequestID.reasonID.name}
          </Link>
        );
      }
      if (
        order.orderStageID.orderStageStatusID.status === OrderStageStatus.RequestToAdmin &&
        order.orderStageID.orderStageStatusID.orderRequestID?.replyStatus === ReplyStatus.Rejected
      )
        actionGroup = (
          <Typography.Paragraph className="m-0 w-1/2 text-end">
            This order has reached its cancel request limit.
          </Typography.Paragraph>
        );
      break;
    case OrderStage.Delivering:
      actionGroup = <DeliveryActions receiveOrder={receiveOrder} rebuyProduct={rebuyProduct} />;
      break;
    case OrderStage.Delivered:
      actionGroup = <RebuyActions rebuyProduct={rebuyProduct} />;
      break;
    case OrderStage.Cancelled:
      actionGroup = <RebuyActions rebuyProduct={rebuyProduct} />;
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
              <ShopOutlined />
              <Typography.Title level={5} className="m-0 inline truncate">
                {order.storeID.name}
              </Typography.Title>
              {/* <Button type="primary" className="px-2 py-1 text-xs">
                <MessageOutlined /> Chat
              </Button> */}
              <Link to={`/user/${order.storeID.userID.slug}`}>
                <Button type="primary" className="px-2 py-1 text-xs">
                  <ShopOutlined /> Visit shop
                </Button>
              </Link>
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
            <Flex vertical className="w-1/2">
              <Typography.Paragraph className="m-0">
                {order.orderStageID.name !== OrderStage.Delivered && 'Expected'} {order.orderStageID.name} Date:{' '}
                {order &&
                  order.orderStageID.orderStageStatusID.expectedDate &&
                  dayjs(order.orderStageID.orderStageStatusID.expectedDate.toString()).format('DD/MM/YYYY')}
              </Typography.Paragraph>
              {order.orderStageID.orderStageStatusID.orderRequestID?.replyStatus === ReplyStatus.Rejected && (
                <>
                  <Typography.Paragraph className="m-0">
                    Cancel Request ({formattedOrderStageStatus(order?.orderStageID.orderStageStatusID.status)}):{' '}
                    <span className="font-semibold text-red-500">
                      {order.orderStageID.orderStageStatusID.orderRequestID.replyStatus.toUpperCase()}
                    </span>
                  </Typography.Paragraph>
                  <Typography.Paragraph className="m-0">
                    Reply Message: {order.orderStageID.orderStageStatusID.orderRequestID.replyMessage}
                  </Typography.Paragraph>
                </>
              )}
            </Flex>
          )}
          {actionGroup}
          {/* <DeliveryActions receiveOrder={receiveOrder} /> */}
        </Flex>
        {actionModal}
        {/* <ReturnModal/> */}
      </div>
    </div>
  );
};

export default CustomerOrderItem;
