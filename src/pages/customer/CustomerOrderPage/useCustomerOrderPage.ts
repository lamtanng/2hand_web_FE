import { useEffect, useState } from 'react';
import { handleError } from '../../../utils/handleError';
import { orderAPIs } from '../../../apis/order.api';
import { UserProps } from '../../../types/user.type';
import { OrderProps } from '../../../types/order.type';
import eventEmitter from '../../../utils/eventEmitter';

const useCustomerOrderPage = (profile: UserProps | undefined) => {
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const getAllOrder = async (userID: string | undefined) => {
    try {
      const res = await orderAPIs.getOrder(userID);
      setOrders(res.data.data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    if (profile) {
      getAllOrder(profile._id);
    }

    const orderStageChangeListener = eventEmitter.addListener('customerOrderStageChanged', () => {
      getAllOrder(profile?._id);
    });

    return () => {
      orderStageChangeListener.remove();
    };
  }, [profile]);

  return {
    orders,
  };
};
export default useCustomerOrderPage;
