import { useEffect, useState } from 'react';
import { productAPIs } from '../../apis/product.api';
import { handleError } from '../../utils/handleError';
import { ProductProps } from '../../types/product.type';

const useHomePage = () => {
  const [newestProduct, setNewestProduct] = useState<ProductProps[]>([]);
  const [freeProduct, setFreeProduct] = useState<ProductProps[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const getNewestProducts = async (page: number, limit: number, sort: string | undefined) => {
    try {
      setLoading(true);
      const res = await productAPIs?.getAllProduct(
        page,
        limit,
        undefined,
        sort,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      setNewestProduct(res?.data?.response?.products);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const getFreeProducts = async (page: number, limit: number, price: string | undefined) => {
    try {
      setLoading(true);
      const res = await productAPIs?.getAllProduct(
        page,
        limit,
        undefined,
        undefined,
        undefined,
        price,
        undefined,
        undefined,
      );
      setFreeProduct(res?.data?.response?.products);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const sort = JSON.stringify({ createdAt: -1 });
    const price = JSON.stringify({ min: 0, max: 0 });
    getNewestProducts(1, 10, sort);
    getFreeProducts(1, 10, price);
  }, []);

  return {
    newestProduct,
    freeProduct,
    isLoading,
  };
};

export default useHomePage;
