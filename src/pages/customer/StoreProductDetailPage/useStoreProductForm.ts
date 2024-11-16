import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserProps } from '../../../types/user.type';
import { CategoryProps } from '../../../types/category.type';
import { StoreProps } from '../../../types/store.type';
import { ProductProps } from '../../../types/product.type';
import { categoryAPIs } from '../../../apis/category.api';
import { handleError } from '../../../utils/handleError';
import { storeAPIs } from '../../../apis/store.api';
import { productAPIs } from '../../../apis/product.api';

const useStoreProductsDetail = (profile: UserProps | undefined) => {
  const param = useParams();
  const [category, setCategory] = useState<CategoryProps[]>([]);
  const [store, setStore] = useState<StoreProps>();
  const [product, setProduct] = useState<ProductProps>();

  const getCategory = async () => {
    try {
      const res = await categoryAPIs.getAllCAtegory();
      console.log(res.data.cates);
      setCategory(res.data.cates);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  const getStoreByUserID = async (userID: string | undefined) => {
    try {
      const res = await storeAPIs.getStoreByUser(userID);
      console.log(res.data);
      setStore(res.data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  const getSingleProductByID = async (productID: string | undefined) => {
    try {
      const res = await productAPIs.getProductByID(productID);
      setProduct(res.data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    getCategory();
    getSingleProductByID(param.id);
    if (profile) {
      getStoreByUserID(profile._id);
    }
  }, []);

  return {
    category,
    store,
    product
  };
};

export default useStoreProductsDetail;
