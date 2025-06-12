import { Modal } from 'antd';
import { useState } from 'react';
import { cartAPIs } from '../../../../../apis/cart.api';
import { orderRequestsAPIs } from '../../../../../apis/orderRequest.api';
import { orderStageAPIs } from '../../../../../apis/orderStage.api';
import { reasonAPIs } from '../../../../../apis/reason.api';
import { CartItemProps } from '../../../../../types/cart.type';
import { ObjectType } from '../../../../../types/enum/objectType.enum';
import { OrderStage } from '../../../../../types/enum/orderStage.enum';
import { Role } from '../../../../../types/enum/role.enum';
import { TaskType } from '../../../../../types/enum/taskType.type';
import { NewCartItemProps } from '../../../../../types/http/cart.type';
import { NewOrderStage } from '../../../../../types/http/orderStage.type';
import { ReasonProps } from '../../../../../types/http/reason.type';
import { OrderProps } from '../../../../../types/order.type';
import { OrderDetailProps } from '../../../../../types/orderDetail.type';
import { displaySuccess } from '../../../../../utils/displayToast';
import eventEmitter from '../../../../../utils/eventEmitter';
import { handleError } from '../../../../../utils/handleError';
import useAccountPage from '../../../AccountPage/useAccountPage';

const useOrderItem = (order: OrderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReasons, setCancelReasons] = useState<ReasonProps[]>([]);
  const [description, setDescription] = useState<string>('');

  const { confirm } = Modal;
  const { profile } = useAccountPage();

  const showConfirm = () => {
    confirm({
      title: 'Do you confirm to receive this order?',
      onOk() {
        changeStage(new Date().toISOString(), OrderStage.Delivered);
      },
    });
  };

  const getReasons = async () => {
    try {
      const res = await reasonAPIs.getAllReason();
      setCancelReasons(
        res.data.reasons.filter(
          (item: ReasonProps) =>
            item.objectType === ObjectType.Order && item.taskType === TaskType.Cancel && item.role === Role.Customer,
        ),
      );
    } catch (error) {
      handleError(error);
    }
  };

  const openCancelModal = () => {
    setIsModalOpen(true);
    getReasons();
  };

  const changeStage = async (date: string, stage: string) => {
    try {
      const data: NewOrderStage = {
        name: stage,
        orderID: order._id,
        expectedDate: date,
        orderStageStatusID: order.orderStageID.orderStageStatusID._id,
      };
      console.log(data);
      await orderStageAPIs.createOrderStage(data);
      eventEmitter.emit('customerOrderStageChanged');
    } catch (error) {
      handleError(error);
    }
  };

  const cancelOrder = async (reason: ReasonProps | undefined) => {
    try {
      const data = {
        name: order.orderStageID.name,
        status: order.orderStageID.orderStageStatusID.status,
        orderStageID: order.orderStageID.orderStageStatusID.orderStageID,
        description: description,
        taskType: TaskType.Cancel,
        reasonID: reason?._id,
      };
      console.log(data);
      await orderRequestsAPIs.createNewRequest(data);
      eventEmitter.emit('customerOrderStageChanged');
    } catch (error) {
      handleError(error);
    }
  };

  const receiveOrder = () => {
    showConfirm();
  };

  const getCartItemByID = async (productID: string | undefined) => {
    const res = await cartAPIs.getCartItem(productID);
    return res.data;
  };

  const rebuyProduct = () => {
    order.orderDetailIDs.forEach(async (item: OrderDetailProps) => {
      try {
        const cartItem: CartItemProps = await getCartItemByID(item.productID._id);
        const totalQuantity = cartItem ? cartItem.quantity + item.quantity : item.quantity;
        const data: NewCartItemProps = {
          userID: profile?._id,
          items: [{ productID: item.productID._id, quantity: totalQuantity }],
        };
        await cartAPIs.addCartItem(data);
        displaySuccess('Product is added to cart successfully.');
        eventEmitter.emit('addToCart', item.productID._id);
      } catch (error) {
        handleError(error);
      }
    });
  };

  return {
    isModalOpen,
    setIsModalOpen,
    receiveOrder,
    cancelReasons,
    openCancelModal,
    cancelOrder,
    setDescription,
    rebuyProduct,
  };
};
export default useOrderItem;
