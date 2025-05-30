import { useEffect, useState } from 'react';
import { ProductProps } from '../../../types/product.type';
import { handleError } from '../../../utils/handleError';
import { productAPIs } from '../../../apis/product.api';

const useProductListPage = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  const getAllProducts = async (page: number, limit: number) => {
    try {
      const res = await productAPIs.getAllProduct(
        page,
        limit,
        null,
        null,
        null,
        null,
        null,
        undefined,
      );
      setProducts(res.data.response.data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    getAllProducts(1, 100);
  }, []);

  return {
    products,
  };
};
export default useProductListPage;
