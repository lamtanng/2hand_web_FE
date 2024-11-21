import { useEffect, useState } from 'react';
import { handleError } from '../../../utils/handleError';
import { adminAPIs } from '../../../apis/admin.api';

const useOrderListPage = () => {
  const [orders, setOrders] = useState<any[]>([]);

  const getOrders = async () => {
    try {
      const res = await adminAPIs.getAllOrders();
      setOrders(res.data);
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
