import { useEffect, useState } from 'react';
import { productAPIs } from '../../apis/product.api';
import { handleError } from '../../utils/handleError';
import { categoryAPIs } from '../../apis/category.api';
import { CategoryProps } from '../../types/category.type';
import { ProductProps } from '../../types/product.type';

const useListProducts = () => {
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [category, setCategory] = useState<CategoryProps[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const getProducts = async (page: number, limit: number, search: string) => {
    try {
      const res = await productAPIs.getAllProduct(page, limit, search);
      setProduct(res?.data.response.products);
    setTotalProducts(res?.data.response.total);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  const getAllCategory = async () => {
    try {
      const res = await categoryAPIs.getAllCAtegory();
      setCategory(res?.data.cates)
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    getProducts(1, 10, '');
    getAllCategory();
  }, []);

  return {
    getProducts,
    product,
    totalProducts,
    category
  };
};

export default useListProducts;
