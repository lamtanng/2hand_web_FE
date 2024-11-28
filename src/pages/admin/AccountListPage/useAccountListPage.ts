import { useEffect, useState } from 'react';
import { UserProps } from '../../../types/user.type';
import { handleError } from '../../../utils/handleError';
import { userAPIs } from '../../../apis/user.api';
import { adminAPIs } from '../../../apis/admin.api';

const useAccountListPage = () => {
  const [users, setUsers] = useState<UserProps[]>([]);

  const getAll = async () => {
    try {
      await adminAPIs.accessDashboard();
      const res = await userAPIs.getAllUsers();
      setUsers(res.data.users);
    } catch (error) {
      handleError;
    } finally {
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return {
    users,
  };
};
export default useAccountListPage;
