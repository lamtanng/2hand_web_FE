import { useEffect, useState } from 'react';
import { productAPIs } from '../../apis/product.api';
import { handleError } from '../../utils/handleError';
import { ProductProps } from '../../types/product.type';
import { useAppSelector } from '../../redux/hooks';
import { loginSelector } from '../../redux/slices/login.slice';

const useHomePage = () => {
  const [newestProduct, setNewestProduct] = useState<ProductProps[]>([]);
  const [freeProduct, setFreeProduct] = useState<ProductProps[]>([]);
  const [recommendedProduct, setRecommendedProduct] = useState<ProductProps[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { user } = useAppSelector(loginSelector);

  const getNewestProducts = async (page: number, limit: number, sort: string | null) => {
    const res = await productAPIs?.getAllProduct(page, limit, null, sort, null, null, null, undefined, true, undefined);
    setNewestProduct(res?.data?.response?.data);
  };

  const getFreeProducts = async (page: number, limit: number, price: string | null) => {
    const res = await productAPIs?.getAllProduct(
      page,
      limit,
      null,
      null,
      null,
      price,
      null,
      undefined,
      true,
      undefined,
    );
    setFreeProduct(res?.data?.response?.data);
  };

  const getRecommendedProducts = async (userID?: string) => {
    try {
      setLoading(true);
      const res = await productAPIs?.getProductHistory(userID);
      setRecommendedProduct(res?.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = () => {
    try {
      setLoading(true);
      const sort = JSON.stringify({ createdAt: -1 });
      const price = JSON.stringify({ min: 0, max: 0 });
      getNewestProducts(1, 10, sort);
      getFreeProducts(1, 10, price);
      getRecommendedProducts(user?._id);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    newestProduct,
    freeProduct,
    recommendedProduct,
    isLoading,
  };
};

export default useHomePage;
