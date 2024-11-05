import { useEffect, useState } from 'react';
import { productAPIs } from '../../apis/product.api';
import { handleError } from '../../utils/handleError';
import { ProductProps } from '../../types/product.type';

const useHomePage = () => {
  const [newestProduct, setNewestProduct] = useState<ProductProps[]>([]);
  const [freeProduct, setFreeProduct] = useState<ProductProps[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const getNewestProducts = async (
    page: number,
    limit: number,
    search: string | undefined,
    sort: string | undefined,
    quality: string[],
    price: string | undefined,
    cateID: string | undefined,
  ) => {
    try {
      setLoading(true);
      let qualityGroup = quality.length !== 0 ? JSON.stringify(quality) : '';
      const res = await productAPIs?.getAllProduct(page, limit, search, sort, qualityGroup, price, cateID);
      setNewestProduct(res?.data?.response?.products);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const getFreeProducts = async (
    page: number,
    limit: number,
    search: string | undefined,
    sort: string | undefined,
    quality: string[],
    price: string | undefined,
    cateID: string | undefined,
  ) => {
    try {
      setLoading(true);
      let qualityGroup = quality.length !== 0 ? JSON.stringify(quality) : '';
      const res = await productAPIs?.getAllProduct(page, limit, search, sort, qualityGroup, price, cateID);
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
    getNewestProducts(1, 10, undefined, sort, [], undefined, undefined);
    getFreeProducts(1, 10, undefined, undefined, [], price, undefined);
  }, []);

  return {
    newestProduct,
    freeProduct,
    isLoading,
  };
};

export default useHomePage;
