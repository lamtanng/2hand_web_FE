import { useEffect, useState } from 'react';
import { UserProps } from '../../../types/user.type';
import { handleError } from '../../../utils/handleError';
import { adminAPIs } from '../../../apis/admin.api';
import { message } from 'antd';

const useAccountListPage = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const res = await adminAPIs.getUsers();
      setUsers(res.data.data);
    } catch (error) {
      handleError(error);
      message.error('Failed to fetch user accounts');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUsers = async () => {
    message.loading('Refreshing user data...');
    await getUsers();
    message.success('User data refreshed successfully');
  };

  useEffect(() => {
    getUsers();
  }, []);

  return {
    users,
    isLoading,
    refreshUsers,
  };
};

export default useAccountListPage;
