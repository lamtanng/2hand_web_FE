import { MessageOutlined, ShopOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Typography, Image } from 'antd';
import { Link } from 'react-router-dom';
import defaultPic from '../../../../../assets/blob.jpg';
import { CancelingActions, ConfirmActions, DeliveryActions } from '../ActionGroup';
import PickupDateModal from '../PickupDateModal';
import useOrderItem from './useOrderItem';
import { OrderDetailProps } from '../../../../../types/orderDetail.type';
import { OrderProps } from '../../../../../types/order.type';
import { OrderStage } from '../../../../../types/enum/orderStage.enum';
import { OrderStageStatus } from '../../../../../types/enum/orderStageStatus.enum';
import DirectCancelModal from '../DirectCancelModal';

const OrderItem = ({ order }: { order: OrderProps }) => {
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
      if (order.orderStageID.orderStageStatusID.status === OrderStageStatus.Active)
        actionGroup = <DeliveryActions deliveringOrder={deliveringOrder} isLoading={isLoading} />;
      if (order.orderStageID.orderStageStatusID.status === OrderStageStatus.RequestToSeller)
        actionGroup = <CancelingActions />;
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
              <Button type="primary" className="px-2 py-1 text-xs">
                <MessageOutlined /> Chat
              </Button>
              <Button variant="outlined" className="px-2 py-1 text-xs">
                <ShopOutlined /> Visit shop
              </Button>
            </Flex>
            <div id="order-status">
              <p className="m-0 font-sans text-blue-700">{order?.orderStageID?.name && order.orderStageID.name}</p>
            </div>
          </Flex>
        </div>
        <Divider className="m-0 mt-6" />
        {order.orderDetailIDs.map((item: OrderDetailProps) => (
          <Link to={order._id}>
            <div id="order-detail" className="mt-6">
              <Flex justify="space-between" align="center">
                <div id="product-info" className="w-5/6">
                  <Flex gap={'middle'}>
                    <Image width={75} preview={false} alt="" src={item.productID.image[0]} fallback={defaultPic} />
                    <div>
                      <Typography.Title level={5} className="m-0 mb-2">
                        {item.productID.name}
                      </Typography.Title>
                      <Typography.Paragraph className="text-xs">x {item.quantity}</Typography.Paragraph>
                    </div>
                  </Flex>
                </div>
                <div id="prodct-price" className="font-sans">
                  {item.productID.price} VND
                </div>
              </Flex>
            </div>
          </Link>
        ))}
        <Divider />
        <div id="total-price">
          <Flex justify="end" align="center" gap={'middle'}>
            <p className="m-0 font-sans">Total price:</p>
            <p className="m-0 font-sans text-xl text-blue-700">{order.total + order.shipmentCost}</p>
          </Flex>
        </div>
        {actionGroup}
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

export default OrderItem;
