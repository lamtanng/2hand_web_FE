import { useEffect, useState } from 'react';
import { productAPIs } from '../../../../apis/product.api';
import { handleError } from '../../../../utils/handleError';
import { ProductProps } from '../../../../types/product.type';

const useProductList = () => {
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProducts = async (
    page: number,
    limit: number,
    search: string | undefined,
    sort: string | undefined,
    quality: string[],
    price: string | undefined,
    cateID: string | undefined,
  ) => {
    try {
      setIsLoading(true);
      let qualityGroup = quality.length !== 0 ? JSON.stringify(quality) : '';
      const res = await productAPIs.getAllProduct(page, limit, search, sort, qualityGroup, price, cateID);
      setProduct(res?.data.response.products);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts(1, 10, undefined, undefined, [], undefined, undefined);
  }, []);

  return {
    product,
    isLoading,
  };
};

export default useProductList;
