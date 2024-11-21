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
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      setProducts(res.data.response.products);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    getAllProducts(1, 10);
  }, []);

  return {
    products,
  };
};
export default useProductListPage;
