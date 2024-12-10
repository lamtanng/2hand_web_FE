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
    const res = await userAPIs.getUserByUserSlug(slug);
    setProfile(res.data);
    return res.data;
  };

  const getStore = async (userID: string | undefined) => {
    const res = await storeAPIs.getStoreByUser(userID);
    setStore(res.data);
    return res.data;
  };

  const getStoreProducts = async (page: number, limit: number, storeID: (string | undefined)[]) => {
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
    setStoreProduct(res?.data?.response?.data);
  };

  const fetchData = async (slug: string | undefined) => {
    try {
      setLoading(true);
      const profileData = await getUserBySlug(slug);
      if (profileData) {
        const storeData = await getStore(profileData._id);
        if (storeData) {
          getStoreProducts(1, 10, [storeData._id]);
        }
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(param.slug);
  }, []);

  return {
    store,
    isLoading,
    storeProduct,
    profile,
  };
};

export default useUserProfileDetail;
