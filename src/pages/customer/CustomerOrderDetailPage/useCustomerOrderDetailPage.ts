import { useEffect, useState } from 'react';
import { orderAPIs } from '../../../apis/order.api';
import { handleError } from '../../../utils/handleError';
import { useParams } from 'react-router-dom';
import { OrderProps } from '../../../types/order.type';
import { reasonAPIs } from '../../../apis/reason.api';
import { orderStageAPIs } from '../../../apis/orderStage.api';
import eventEmitter from '../../../utils/eventEmitter';
import { TaskType } from '../../../types/enum/taskType.type';
import { orderRequestsAPIs } from '../../../apis/orderRequest.api';
import { Modal } from 'antd';
import { OrderStage } from '../../../types/enum/orderStage.enum';
import { ObjectType } from '../../../types/enum/objectType.enum';
import { ReasonProps } from '../../../types/http/reason.type';
import { NewRequestProps } from '../../../types/http/orderRequest.type';
import { NewOrderStage } from '../../../types/http/orderStage.type';
import { OrderStageTrackingProps } from '../../../types/orderTracking.type';
import { Role } from '../../../types/enum/role.enum';
import { OrderDetailProps } from '../../../types/orderDetail.type';
import { CartItemProps } from '../../../types/cart.type';
import { NewCartItemProps } from '../../../types/http/cart.type';
import { cartAPIs } from '../../../apis/cart.api';
import { displaySuccess } from '../../../utils/displayToast';
import useAccountPage from '../AccountPage/useAccountPage';

const useCustomerOrderDetailPage = () => {
  const params = useParams();
  const [order, setOrder] = useState<OrderProps>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReasons, setCancelReasons] = useState<ReasonProps[]>([]);
  const [description, setDescription] = useState<string>('');
  const [stages, setStages] = useState<OrderStageTrackingProps[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

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

  const getSingleOrder = async (orderID: string | undefined) => {
    const res = await orderAPIs.getOrderByID(orderID);
    setOrder(res.data);
  };

  const trackingSingleOrder = async (orderID: string | undefined) => {
    const res = await orderAPIs.trackingOrder(orderID);
    setStages(res.data);
  };

  const fetchData = (orderID: string | undefined) => {
    try {
      setLoading(true);
      getSingleOrder(orderID);
      trackingSingleOrder(orderID);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
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
        orderID: order?._id,
        expectedDate: date,
        orderStageStatusID: order?.orderStageID.orderStageStatusID._id,
      };
      await orderStageAPIs.createOrderStage(data);
      eventEmitter.emit('customerOrderDetailStageChanged', order?._id);
    } catch (error) {
      handleError(error);
    }
  };

  const directCancel = async (reason: ReasonProps | undefined) => {
    try {
      const data: NewRequestProps = {
        name: order?.orderStageID.name,
        status: order?.orderStageID.orderStageStatusID.status,
        orderStageID: order?.orderStageID.orderStageStatusID.orderStageID,
        description: 'Direct Cancel',
        taskType: TaskType.Cancel,
        reasonID: reason?._id,
      };
      await orderRequestsAPIs.createNewRequest(data);
      eventEmitter.emit('customerOrderDetailStageChanged', order?._id);
    } catch (error) {
      handleError(error);
    }
  };

  const cancelOrder = async (reason: ReasonProps | undefined) => {
    try {
      const data: NewRequestProps = {
        name: order?.orderStageID.name,
        status: order?.orderStageID.orderStageStatusID.status,
        orderStageID: order?.orderStageID.orderStageStatusID.orderStageID,
        description: description,
        taskType: TaskType.Cancel,
        reasonID: reason?._id,
      };
      await orderRequestsAPIs.createNewRequest(data);
      eventEmitter.emit('customerOrderDetailStageChanged', order?._id);
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
    order?.orderDetailIDs.forEach(async (item: OrderDetailProps) => {
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

  useEffect(() => {
    fetchData(params?.id);

    const orderStageChangeListener = eventEmitter.addListener('customerOrderDetailStageChanged', (orderID: string) => {
      fetchData(orderID);
    });

    const addReviewListener = eventEmitter.addListener('addReview', (orderID: string) => {
      fetchData(orderID);
    });

    return () => {
      orderStageChangeListener.remove();
      addReviewListener.remove();
    };
  }, []);

  return {
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
    isLoading,
    rebuyProduct
  };
};

export default useCustomerOrderDetailPage;