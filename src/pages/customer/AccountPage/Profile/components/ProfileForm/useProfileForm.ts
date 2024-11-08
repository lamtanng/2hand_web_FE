import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileProps, profileSchema } from '../../Profile.constants';
import { useForm } from 'react-hook-form';
import { handleError } from '../../../../../../utils/handleError';
import { useEffect, useState } from 'react';
import { DatePickerProps } from 'antd';
import { useAppSelector } from '../../../../../../redux/hooks';
import { loginSelector } from '../../../../../../redux/slices/login.slice';
import { displaySuccess } from '../../../../../../utils/displayToast';
import eventEmitter from '../../../../../../utils/eventEmitter';
import { userAPIs } from '../../../../../../apis/user.api';

const useProfileForm = () => {
  const { user } = useAppSelector(loginSelector);
  const [dob, setDob] = useState<Date | undefined>(user.dateOfBirth);
  const method = useForm<ProfileProps>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
  });
  const { handleSubmit, reset } = method;

  const getUserByID = async (userID: string | undefined) => {
    try {
      const res = await userAPIs.getUserByUserID(userID);
      reset(res.data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  const onDateChange: DatePickerProps['onChange'] = (date: any, dateString: any) => {
    setDob(dateString);
    console.log(date);
  };

  const handleUpdateUser = async (account: ProfileProps) => {
    try {
      const data = {
        _id: user._id,
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        phoneNumber: account.phoneNumber,
        dateOfBirth: dob,
      };
      await userAPIs.updateUser(data);
      displaySuccess('Updated user profile successfully.');
      eventEmitter.emit('updateProfile', user._id);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    getUserByID(user._id);
  }, []);

  return {
    handleSubmit,
    handleUpdateUser,
    method,
    reset,
    onDateChange,
    dob,
  };
};

export default useProfileForm;
