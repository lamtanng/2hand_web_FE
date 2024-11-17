import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormPhoneNumberProps, phoneNumberSchema } from '../../PhoneModal.constants';
import parsePhoneNumber from 'libphonenumber-js';
import { userAPIs } from '../../../../../../../apis/user.api';
import { handleError } from '../../../../../../../utils/handleError';

const usePhoneForm = (
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  handleCreatePhone: (phoneNumber: string | undefined) => void,
) => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const method = useForm<FormPhoneNumberProps>({
    resolver: yupResolver(phoneNumberSchema),
    defaultValues: {},
  });
  const { handleSubmit, reset } = method;

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleAddPhone = async (phoneNumber: FormPhoneNumberProps) => {
    try {
      const phone = phoneNumber.phoneNumber && parsePhoneNumber(phoneNumber.phoneNumber, 'VN');
      let data;
      setSubmitting(true);
      if (phone) {
        data = {
          phoneNumber: phone.number,
        };
      }
      await userAPIs.sendPhoneOTP(data);
      handleCreatePhone(phoneNumber.phoneNumber);
    } catch (error) {
      handleError;
    } finally {
      reset();
      setSubmitting(false);
    }
  };

  return {
    handleClose,
    handleSubmit,
    reset,
    method,
    isSubmitting,
    handleAddPhone,
  };
};
export default usePhoneForm;
