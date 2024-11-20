import { useEffect, useState } from 'react';
import { handleError } from '../../../utils/handleError';
import { orderAPIs } from '../../../apis/order.api';
import { UserProps } from '../../../types/user.type';
import { storeAPIs } from '../../../apis/store.api';
import { StoreProps } from '../../../types/store.type';

const useStoreOrderPage = (profile: UserProps | undefined) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [store, setStore] = useState<StoreProps>();

  const getStoreByUserID = async (userID: string |undefined) => {
    try {
        const res = await storeAPIs.getStoreByUser(userID);
        setStore(res.data);
    } catch (error) {
        handleError(error)
    } finally {}
  }

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
        getAllOrder(store._id)
    }
  }, [store])

  return {
    orders,
  };
};
export default useStoreOrderPage;
