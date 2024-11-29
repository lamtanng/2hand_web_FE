import { useEffect, useState } from 'react';
import { productAPIs } from '../../apis/product.api';
import { handleError } from '../../utils/handleError';
import { categoryAPIs } from '../../apis/category.api';
import { CategoryProps } from '../../types/category.type';
import { ProductProps } from '../../types/product.type';

const useListProducts = () => {
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [category, setCategory] = useState<CategoryProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(4);
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>(JSON.stringify({ createdAt: -1 }));
  const [quality, setQuality] = useState<string[]>([]);
  const [price, setPrice] = useState<string>('');
  // const [cateID, setCateID] = useState<string>('');
  const [storeID, setStoreID] = useState<string[]>([]);

  const getProducts = async (
    page: number,
    limit: number,
    search: string | undefined,
    sort: string | undefined,
    quality: string[],
    price: string | undefined,
    cateID: string[],
    storeID: string[],
  ) => {
    try {
      setLoading(true);
      let qualityGroup = quality.length !== 0 ? JSON.stringify(quality) : '';
      let storeIDGroup = storeID?.length !== 0 ? JSON.stringify(storeID) : '';
      let cateIDGroup = cateID?.length !== 0 ? JSON.stringify(cateID) : '';
      const res = await productAPIs?.getAllProduct(
        page,
        limit,
        search,
        sort,
        qualityGroup,
        price,
        cateIDGroup,
        storeIDGroup,
      );
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
  }, [page, limit, search, sort, quality, price, selectedCategory, storeID]);

  return {
    getProducts,
    product,
    totalProducts,
    category,
    isLoading,
    quality,
    limit,
    price,
    // setCateID,
    setPage,
    setLimit,
    setPrice,
    setSort,
    setSearch,
    setQuality,
    setStoreID,
    setSelectedCategory,
    selectedCategory,
  };
};

export default useListProducts;
