import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { VerifyProps, verifySchema } from './VerifyOTP.constant';
import { UserProps } from '../../../../../../../../types/user.type';
import { handleError } from '../../../../../../../../utils/handleError';
import { useState } from 'react';
import { userAPIs } from '../../../../../../../../apis/user.api';
import parsePhoneNumber from 'libphonenumber-js';
import { AxiosError } from 'axios';

const useVerifyForm = (
  phoneNumber: string | undefined,
  profile: UserProps | undefined,
  handleResendClick: () => void,
  handleVerifyError: () => void,
) => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const method = useForm<VerifyProps>({
    resolver: yupResolver(verifySchema),
    defaultValues: {
      otp: [],
    },
  });
  const { handleSubmit, reset } = method;

  const handleVerify = async (otp: VerifyProps) => {
    try {
      setSubmitting(true);
      let data;
      const sentOTP = otp.otp?.join('');
      const phone = phoneNumber && parsePhoneNumber(phoneNumber, 'VN');
      if (phone) {
        data = {
          _id: profile?._id,
          phoneNumber: phone.number,
          otp: sentOTP,
        };
      }
      await userAPIs.verifyPhoneNumber(data);
    } catch (error: AxiosError | any) {
      handleError(error);
      if (error.statusCode === 410) {
        handleVerifyError();
      }
    } finally {
      reset();
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      let data;
      const phone = phoneNumber && parsePhoneNumber(phoneNumber, 'VN');
      if (phone) {
        data = {
          phoneNumber: phone.number,
        };
      }
      await userAPIs.sendPhoneOTP(data);
      handleResendClick();
    } catch (error) {
      handleError;
    } finally {
    }
  };

  return {
    handleSubmit,
    method,
    reset,
    handleVerify,
    isSubmitting,
    handleResend,
  };
};

export default useVerifyForm;
