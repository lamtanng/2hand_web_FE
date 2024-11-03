import { useEffect, useState } from 'react';
import { productAPIs } from '../../apis/product.api';
import { useParams } from 'react-router-dom';
import { ProductProps } from '../../types/product.type';

const useProductDetail = () => {
  const param = useParams();
  console.log(param.productSlug);

  const [product, setProduct] = useState<ProductProps>();

  const getSingleProduct = async (slug: string | undefined) => {
    const res = await productAPIs.getProductBySlug(slug);
    setProduct(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getSingleProduct(param.productSlug);
  }, []);

  return {
    product,
    getSingleProduct,
  };
};

export default useProductDetail;
