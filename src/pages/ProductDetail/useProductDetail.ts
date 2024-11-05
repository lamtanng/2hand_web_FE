import { useEffect, useState } from 'react';
import { productAPIs } from '../../apis/product.api';
import { useParams } from 'react-router-dom';
import { ProductProps } from '../../types/product.type';
import { handleError } from '../../utils/handleError';

const useProductDetail = () => {
  const param = useParams();
  const [product, setProduct] = useState<ProductProps>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [storeProduct, setStoreProduct] = useState<ProductProps[]>([]);

  const getStoreProducts = async (page: number, limit: number, storeID: (string | undefined)[]) => {
    try {
      setLoading(true);
      let storeIDGroup = storeID?.length !== 0 ? JSON.stringify(storeID) : '';
      const res = await productAPIs?.getAllProduct(
        page,
        limit,
        undefined,
        JSON.stringify({ createdAt: -1 }),
        undefined,
        undefined,
        undefined,
        storeIDGroup,
      );
      setStoreProduct(res?.data?.response?.products);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const getSingleProduct = async (slug: string | undefined) => {
    const res = await productAPIs.getProductBySlug(slug);
    setProduct(res.data);
  };

  useEffect(() => {
    getSingleProduct(param.productSlug);
  }, []);

  useEffect(() => {
    getStoreProducts(1, 10, [product?.storeID._id]);
  }, [product]);

  return {
    product,
    getSingleProduct,
    isLoading,
    storeProduct,
    getStoreProducts,
  };
};

export default useProductDetail;
