import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { storeAPIs } from '../../apis/store.api';
import { handleError } from '../../utils/handleError';
import { StoreProps } from '../../types/store.type';
import { ProductProps } from '../../types/product.type';
import { productAPIs } from '../../apis/product.api';
import { UserProps } from '../../types/user.type';
import { userAPIs } from '../../apis/user.api';

const useUserProfileDetail = () => {
  const param = useParams();
  const [profile, setProfile] = useState<UserProps>();
  const [store, setStore] = useState<StoreProps>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [storeProduct, setStoreProduct] = useState<ProductProps[]>([]);

  const getUserBySlug = async (slug: string | undefined) => {
    try {
      const res = await userAPIs.getUserByUserSlug(slug);
      setProfile(res.data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  const getStore = async (userID: string | undefined) => {
    try {
      const res = await storeAPIs.getStoreByUser(userID);
      setStore(res.data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

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

  useEffect(() => {
    getUserBySlug(param.slug);
  }, []);

  useEffect(() => {
    if (profile) {
      getStore(profile._id);
    }
  }, [profile]);

  useEffect(() => {
    if (store) {
      getStoreProducts(1, 10, [store._id]);
    }
  }, [store]);

  return {
    store,
    isLoading,
    storeProduct,
    profile,
  };
};

export default useUserProfileDetail;
