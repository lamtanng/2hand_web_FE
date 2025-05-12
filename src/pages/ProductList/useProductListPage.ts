import { useEffect, useState } from 'react';
import { productAPIs } from '../../apis/product.api';
import { handleError } from '../../utils/handleError';
import { categoryAPIs } from '../../apis/category.api';
import { CategoryProps } from '../../types/category.type';
import { ProductProps } from '../../types/product.type';
import { useSearchParams } from 'react-router-dom';

const useListProducts = () => {
  let [searchParams] = useSearchParams();
  console.log(searchParams.get('category'));
  const page = Number(searchParams.get('page'));
  const limit = Number(searchParams.get('limit'));
  const search = searchParams.get('search');
  const sort = searchParams.get('sort') ?? JSON.stringify({ createdAt: -1 });
  const price = searchParams.get('price');
  const quality = searchParams.get('quality');
  const selectedCategory = searchParams.get('category');
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [category, setCategory] = useState<CategoryProps[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [storeID, setStoreID] = useState<string[]>([]);

  const getProducts = async (
    page: number,
    limit: number,
    search: string | null,
    sort: string | null,
    quality: string | null,
    price: string | null,
    cateID: string | null,
    storeID: string[],
  ) => {
    try {
      setLoading(true);
      let storeIDGroup = storeID?.length !== 0 ? JSON.stringify(storeID) : '';
      const res = await productAPIs?.getAllProduct(page, limit, search, sort, quality, price, cateID, storeIDGroup);
      setProduct(res?.data?.response?.data);
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
    getProducts(page, limit, search, sort, quality, price, selectedCategory, storeID);
  }, [searchParams, selectedCategory, storeID]);

  return {
    getProducts,
    product,
    totalProducts,
    category,
    isLoading,
    setStoreID,
  };
};

export default useListProducts;
