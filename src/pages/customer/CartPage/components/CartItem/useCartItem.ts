import { useEffect, useState } from 'react';
import { userAPIs } from '../../../../../apis/user.api';
import { handleError } from '../../../../../utils/handleError';
import { UserProps } from '../../../../../types/user.type';

const useCartItem = (user: string | undefined) => {
  const [profile, setProfile] = useState<UserProps>();
  const getUserByID = async (userID: string | undefined) => {
    try {
      const res = await userAPIs.getUserByUserID(userID);
      setProfile(res.data)
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    const userID = user && JSON.parse(user)
    getUserByID(userID)
  }, [])

  return {
    profile
  };
};
export default useCartItem;
