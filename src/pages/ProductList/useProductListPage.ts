import { useEffect, useState } from 'react';
import { productAPIs } from '../../apis/product.api';
import { handleError } from '../../utils/handleError';
import { categoryAPIs } from '../../apis/category.api';
import { CategoryProps } from '../../types/category.type';
import { ProductProps } from '../../types/product.type';

const useListProducts = () => {
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [category, setCategory] = useState<CategoryProps[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(2);
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<{ price?: number; createAt?: number }>({});
  const [quality, setQuality] = useState<string[]>([]);
  const [price, setPrice] = useState<{ min?: number; max?: number }>({});
  const [cateID, setCateID] = useState<string[]>([]);

  const getProducts = async (
    page: number,
    limit: number,
    search: string,
    sort: { price?: number; createAt?: number },
    quality: string[],
    price: { min?: number; max?: number },
    cateID: string[],
  ) => {
    try {
      setLoading(true);
      let qualityGroup = quality.length !== 0 ? JSON.stringify(quality) : '';
      const res = await productAPIs?.getAllProduct(page, limit, search, sort, qualityGroup, price, cateID);
      setProduct(res?.data?.response?.products);
      setTotalProducts(res?.data?.response?.total);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllCategory = async () => {
    try {
      const res = await categoryAPIs.getAllCAtegory();
      setCategory(res?.data.cates);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    getProducts(page, limit, search, sort, quality, price, cateID);
  }, [page, limit, search, sort, quality, price, cateID]);

  return {
    getProducts,
    product,
    totalProducts,
    category,
    isLoading,
    quality,
    limit,
    price,
    setCateID,
    setPage,
    setLimit,
    setPrice,
    setSort,
    setSearch,
    setQuality,
  };
};

export default useListProducts;
