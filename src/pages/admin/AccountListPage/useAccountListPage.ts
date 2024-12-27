import { useEffect, useState } from 'react';
import { UserProps } from '../../../types/user.type';
import { handleError } from '../../../utils/handleError';
import { adminAPIs } from '../../../apis/admin.api';

const useAccountListPage = () => {
  const [users, setUsers] = useState<UserProps[]>([]);

  const getAll = async () => {
    try {
      const res = await adminAPIs.getUsers();
      setUsers(res.data.data);
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
