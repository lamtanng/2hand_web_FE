import { useEffect, useState } from 'react';
import { productAPIs } from '../../../../apis/product.api';
import { handleError } from '../../../../utils/handleError';
import { ProductProps } from '../../../../types/product.type';

const useProductList = () => {
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProducts = async (page: number, limit: number) => {
    try {
      setIsLoading(true);
      const res = await productAPIs.getAllProduct(
        page,
        limit,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      setProduct(res?.data.response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts(1, 10);
  }, []);

  return {
    product,
    isLoading,
  };
};

export default useProductList;
