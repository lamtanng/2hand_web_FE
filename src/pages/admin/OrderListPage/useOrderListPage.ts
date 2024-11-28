import { useEffect, useState } from 'react';
import { handleError } from '../../../utils/handleError';
import { adminAPIs } from '../../../apis/admin.api';
import { OrderProps } from '../../../types/order.type';

const useOrderListPage = () => {
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const getOrders = async () => {
    try {
      const res = await adminAPIs.getAllOrders();
      setOrders(res.data.data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return {
    orders,
  };
};
export default useOrderListPage;
