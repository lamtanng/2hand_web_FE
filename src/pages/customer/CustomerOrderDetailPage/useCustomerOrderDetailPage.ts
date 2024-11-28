import { useEffect, useState } from 'react';
import { orderAPIs } from '../../../apis/order.api';
import { handleError } from '../../../utils/handleError';
import { useParams } from 'react-router-dom';
import { OrderProps } from '../../../types/order.type';

const useCustomerOrderDetailPage = () => {
  const params = useParams();
  const [order, setOrder] = useState<OrderProps>();

  const getSingleOrder = async (orderID: string | undefined) => {
    try {
      const res = await orderAPIs.getOrderByID(orderID);
      setOrder(res.data);
    } catch (error) {
      handleError;
    } finally {
    }
  };

  useEffect(() => {
    getSingleOrder(params.id);
  }, []);

  return {
    order,
  };
};
export default useCustomerOrderDetailPage;
