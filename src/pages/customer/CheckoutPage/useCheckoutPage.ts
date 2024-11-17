import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { loginSelector } from '../../../redux/slices/login.slice';
import { handleError } from '../../../utils/handleError';
import { UserProps } from '../../../types/user.type';
import { userAPIs } from '../../../apis/user.api';
import eventEmitter from '../../../utils/eventEmitter';
import { AddressProps } from '../../../types/address.type';

const useCheckoutPage = () => {
  const { user } = useAppSelector(loginSelector);
  const [profile, setProfile] = useState<UserProps>();
  const [value, setValue] = useState<AddressProps>();

  console.log(user);

  const getUserByID = async (userID: string | undefined) => {
    try {
      const res = await userAPIs.getUserByUserID(userID);
      setProfile(res.data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getUserByID(user._id);

    const addAddressListener = eventEmitter.addListener('addAddress', () => {
      getUserByID(user._id);
    });
    const updateAddressListener = eventEmitter.addListener('updateAddress', () => {
      getUserByID(user._id);
    });

    return () => {
      addAddressListener.remove();
      updateAddressListener.remove();
    };
  }, []);

  return {
    profile,
    value,
    setValue,
  };
};
export default useCheckoutPage;
