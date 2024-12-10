import { useEffect, useState } from 'react';
import { UserProps } from '../../../types/user.type';
import { handleError } from '../../../utils/handleError';
import { productAPIs } from '../../../apis/product.api';
import { storeAPIs } from '../../../apis/store.api';
import { orderAPIs } from '../../../apis/order.api';
import { OrderStage } from '../../../types/enum/orderStage.enum';

const useStoreDashboardPage = (profile: UserProps | undefined) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalDeliveredOrders, setTotalDeliveredOrders] = useState<number>(0);

  const getStoreByUserID = async (userID: string | undefined) => {
    const res = await storeAPIs.getStoreByUser(userID);
    return res.data;
  };

  const getProducts = async (page: number, limit: number, storeID: (string | undefined)[]) => {
    const sort = JSON.stringify({ createdAt: -1 });
    const store = JSON.stringify(storeID);
    const res = await productAPIs.getAllProduct(page, limit, undefined, sort, undefined, undefined, undefined, store);
    return res?.data.response.total;
  };

  const getOrders = async (storeID: string | undefined, stages: string[], page: number) => {
    const stage = stages?.length !== 0 ? JSON.stringify(stages) : undefined;
    const res = await orderAPIs.getSellerOrder(storeID, stage, page);
    return res.data.total;
  };

  const getTotal = async (storeID: string | undefined) => {
    const total = await getOrders(storeID, [], 1);
    setTotalOrders(total);
    const deliveredOrders = await getOrders(storeID, [OrderStage.Delivered], 1);
    setTotalDeliveredOrders(deliveredOrders);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const store = await getStoreByUserID(profile?._id);
      if (store) {
        const storeID = store._id;
        const productsCount = await getProducts(1, 10, [storeID]);
        setProducts(productsCount ?? 0);
        getTotal(storeID);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (profile) {
      fetchData();
    }
  }, [profile]);

  return {
    isLoading,
    totalOrders,
    totalDeliveredOrders,
    products,
  };
};
export default useStoreDashboardPage;
