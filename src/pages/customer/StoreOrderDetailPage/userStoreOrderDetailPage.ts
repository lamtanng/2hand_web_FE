import { useEffect, useState } from 'react';
import { StoreProps } from '../../../types/store.type';
import { storeAPIs } from '../../../apis/store.api';
import { handleError } from '../../../utils/handleError';
import { orderAPIs } from '../../../apis/order.api';
import { UserProps } from '../../../types/user.type';
import { useParams } from 'react-router-dom';

const useStoreOrderDetailPage = (profile: UserProps | undefined) => {
  const params = useParams();
  const [orders, setOrders] = useState<any[]>([]);
  const [store, setStore] = useState<StoreProps>();
  const [order, setOrder] = useState<any>();

  const getStoreByUserID = async (userID: string | undefined) => {
    try {
      const res = await storeAPIs.getStoreByUser(userID);
      setStore(res.data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  const getAllOrder = async (storeID: string | undefined) => {
    try {
      const res = await orderAPIs.getSellerOrder(storeID);
      setOrders(res.data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    if (profile) {
      getStoreByUserID(profile._id);
    }
  }, [profile]);

  useEffect(() => {
    if (store) {
      getAllOrder(store._id);
    }
  }, [store]);

  useEffect(() => {
    if (orders.length !== 0) {
      const selectedOrder = orders.find((item: any) => item._id === params.id);
      setOrder(selectedOrder);
    }
  }, [orders]);

  return {
    order,
  };
};
export default useStoreOrderDetailPage;
