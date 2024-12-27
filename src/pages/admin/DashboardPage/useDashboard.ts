import { useEffect, useState } from 'react';
import { handleError } from '../../../utils/handleError';
import { adminAPIs } from '../../../apis/admin.api';

interface StatisticsProps {
  productTotal: number;
  orders: { _id: string; count: number; totalAmount: number }[];
  userTotal: number;
  storeTotal: number;
}

const useDashboard = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<StatisticsProps>();
  const getStatistics = async () => {
    try {
      setLoading(true);
      const res = await adminAPIs.getAdminStatistics();
      setStatistics(res.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStatistics();
  }, []);
  return {
    isLoading,
    statistics,
  };
};
export default useDashboard;
