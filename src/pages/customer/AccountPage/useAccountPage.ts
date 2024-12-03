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
  const [isLoading, setLoading] = useState<boolean>(false);
  const [base64Images, setBase64Images] = useState<string[]>([]);

  const getUserByID = async (userID: string | undefined) => {
    try {
      setLoading(true);
      const res = await userAPIs.getUserByUserID(userID);
      setProfile(res.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
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
    base64Images,
    setBase64Images,
    isLoading
  };
};

export default useAccountPage;
