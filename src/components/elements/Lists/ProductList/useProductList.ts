import { useEffect, useState } from 'react';
import { productAPIs } from '../../../../apis/product.api';
import { handleError } from '../../../../utils/handleError';
import { ProductProps } from '../../../../types/product.type';

const useProductList = () => {
  const [product, setProduct] = useState<ProductProps[]>([]);

  const getProducts = async (page: number, limit: number, search: string) => {
    try {
      const res = await productAPIs.getAllProduct(page, limit, search);
      setProduct(res?.data.response.products);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    getProducts(1, 10, '');
  }, []);

  return {
    product
  };
};

export default useProductList;
