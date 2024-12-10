import { useEffect, useState } from 'react';
import { handleError } from '../../../utils/handleError';
import { orderAPIs } from '../../../apis/order.api';
import { UserProps } from '../../../types/user.type';
import { OrderProps } from '../../../types/order.type';
import eventEmitter from '../../../utils/eventEmitter';

const useCustomerOrderPage = (profile: UserProps | undefined) => {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [stages, setStages] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);

  const getAllOrder = async (userID: string | undefined, stages: string[], page: number) => {
    try {
      window.scrollTo(0, 0);
      setLoading(true);
      const stage = stages.length !== 0 ? JSON.stringify(stages) : undefined;
      const res = await orderAPIs.getOrder(userID, stage, page);
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
      getAllOrder(profile._id, stages, page);
    }

    const orderStageChangeListener = eventEmitter.addListener('customerOrderStageChanged', () => {
      getAllOrder(profile?._id, stages, page);
    });

    const addReviewListener = eventEmitter.addListener('addReview', () => {
      getAllOrder(profile?._id, stages, page);
    });

    return () => {
      orderStageChangeListener.remove();
      addReviewListener.remove();
    };
  }, [profile, stages, page]);

  return {
    orders,
    setStages,
    setPage,
    total,
    isLoading,
    page,
  };
};
export default useCustomerOrderPage;
