import { useEffect, useState } from 'react';
import { orderAPIs } from '../../../apis/order.api';
import { handleError } from '../../../utils/handleError';
import { UserProps } from '../../../types/user.type';
import { useParams } from 'react-router-dom';
import { OrderProps } from '../../../types/order.type';

const useCustomerOrderDetailPage = (profile: UserProps | undefined) => {
  const params = useParams();
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [order, setOrder] = useState<OrderProps>();

  const getAllOrder = async (userID: string | undefined) => {
    try {
      const res = await orderAPIs.getOrder(userID);
      setOrders(res.data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    if (profile) {
      getAllOrder(profile._id);
    }
  }, [profile]);

  useEffect(() => {
    if (orders.length !== 0) {
      const selectedOrder = orders.find((item: OrderProps) => item._id === params.id);
      setOrder(selectedOrder)
    }
  }, [orders]);

  return {
    order,
  };
};
export default useCustomerOrderDetailPage;
