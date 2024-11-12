import { useEffect, useState } from 'react';
import { userAPIs } from '../../../apis/user.api';
import { useAppSelector } from '../../../redux/hooks';
import { loginSelector } from '../../../redux/slices/login.slice';
import { handleError } from '../../../utils/handleError';
import eventEmitter from '../../../utils/eventEmitter';
import { UserProps } from '../../../types/user.type';

const useAccountPage = () => {
  const { user } = useAppSelector(loginSelector);
  const [profile, setProfile] = useState<UserProps>();

  const getUserByID = async (userID: string | undefined) => {
    try {
      const res = await userAPIs.getUserByUserID(userID);
      setProfile(res.data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    getUserByID(user._id);

    const addAddressListener = eventEmitter.addListener('addAddress', () => {
      getUserByID(user._id);
    });
    const deleteAddressListener = eventEmitter.addListener('deleteAddress', () => {
      getUserByID(user._id);
    });
    const updateAddressListener = eventEmitter.addListener('updateAddress', () => {
      getUserByID(user._id);
    });
    const updateProfileListener = eventEmitter.addListener('updateProfile', (userID: string) => {
      getUserByID(userID);
    });
    return () => {
      updateProfileListener.remove();
      addAddressListener.remove();
      deleteAddressListener.remove();
      updateAddressListener.remove();
    };
  }, []);

  return {
    profile,
    user,
  };
};

export default useAccountPage;
