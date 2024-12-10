import { useEffect, useState } from 'react';
import { handleError } from '../../../utils/handleError';
import { orderAPIs } from '../../../apis/order.api';
import { UserProps } from '../../../types/user.type';
import { storeAPIs } from '../../../apis/store.api';
import { StoreProps } from '../../../types/store.type';
import { OrderProps } from '../../../types/order.type';
import eventEmitter from '../../../utils/eventEmitter';

const useStoreOrderPage = (profile: UserProps | undefined) => {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [store, setStore] = useState<StoreProps>();
  const [stages, setStages] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const getStoreByUserID = async (userID: string | undefined) => {
    try {
      const res = await storeAPIs.getStoreByUser(userID);
      setStore(res.data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  const getAllOrder = async (storeID: string | undefined, stages: string[], page: number) => {
    try {
      window.scrollTo(0, 0);
      setLoading(true);
      const stage = stages?.length !== 0 ? JSON.stringify(stages) : undefined;
      const res = await orderAPIs.getSellerOrder(storeID, stage, page);
      setOrders(res.data.data);
      setTotal(res.data.total);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile) {
      getStoreByUserID(profile._id);
    }
  }, [profile]);

  useEffect(() => {
    if (store) {
      getAllOrder(store._id, stages, page);
    }

    const orderStageChangeListener = eventEmitter.addListener('orderStageChanged', () => {
      getAllOrder(store?._id, stages, page);
    });

    return () => {
      orderStageChangeListener.remove();
    };
  }, [store, stages, page]);

  return {
    orders,
    setStages,
    page,
    setPage,
    isLoading,
    total,
  };
};
export default useStoreOrderPage;
