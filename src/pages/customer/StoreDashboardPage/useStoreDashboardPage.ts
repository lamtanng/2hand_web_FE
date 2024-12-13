import { useEffect, useState } from 'react';
import { UserProps } from '../../../types/user.type';
import { handleError } from '../../../utils/handleError';
import { storeAPIs } from '../../../apis/store.api';

interface StatisticsProps {
  productTotal: number;
  orders: { _id: string; count: number; totalAmount: number }[];
}

const useStoreDashboardPage = (profile: UserProps | undefined) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<StatisticsProps>();

  const getStoreByUserID = async (userID: string | undefined) => {
    const res = await storeAPIs.getStoreByUser(userID);
    return res.data;
  };

  const getStatistics = async (storeID: string) => {
    const res = await storeAPIs.getStoreStatistics(storeID);
    setStatistics(res.data);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const store = await getStoreByUserID(profile?._id);
      if (store) {
        const storeID = store._id;
        getStatistics(`"${storeID}"`);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (profile) {
      fetchData();
    }
  }, [profile]);

  return {
    isLoading,
    statistics,
  };
};
export default useStoreDashboardPage;
