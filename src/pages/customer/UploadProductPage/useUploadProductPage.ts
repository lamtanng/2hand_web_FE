import { useEffect, useState } from 'react';
import { handleError } from '../../../utils/handleError';
import { CategoryProps } from '../../../types/category.type';
import { categoryAPIs } from '../../../apis/category.api';
import { StoreProps } from '../../../types/store.type';
import { useAppSelector } from '../../../redux/hooks';
import { loginSelector } from '../../../redux/slices/login.slice';
import { storeAPIs } from '../../../apis/store.api';

const useUploadProductPage = () => {
  const { user } = useAppSelector(loginSelector);
  const [category, setCategory] = useState<CategoryProps[]>([]);
  const [store, setStore] = useState<StoreProps>();

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

  useEffect(() => {
    getCategory();
    getStoreByUserID(user._id);
  }, []);

  return {
    category,
    store
  };
};

export default useUploadProductPage;
