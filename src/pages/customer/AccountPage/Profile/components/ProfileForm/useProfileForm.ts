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
import { UserProps } from '../../../../../../types/user.type';

const useProfileForm = (profile: UserProps | undefined) => {
  const { user } = useAppSelector(loginSelector);
  const [dob, setDob] = useState<Date | undefined>();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const method = useForm<ProfileProps>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  const { handleSubmit, reset } = method;

  const onDateChange: DatePickerProps['onChange'] = (date: any, dateString: any) => {
    setDob(dateString);
    console.log(date);
  };

  const handleUpdateUser = async (account: ProfileProps) => {
    try {
      setSubmitting(true);
      const data: UserProps = {
        _id: user._id,
        firstName: account.firstName,
        lastName: account.lastName,
        dateOfBirth: dob,
      };
      await userAPIs.updateUser(data);
      displaySuccess('Updated user profile successfully.');
      eventEmitter.emit('updateProfile', user._id);
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (profile) {
      reset(profile);
      setDob(profile.dateOfBirth)
    }
  }, [profile]);

  return {
    handleSubmit,
    handleUpdateUser,
    method,
    reset,
    onDateChange,
    dob,
    isSubmitting,
    profile,
  };
};

export default useProfileForm;
