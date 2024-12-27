import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import { useForm } from 'react-hook-form';
import { handleError } from '../../../../utils/handleError';
import { authAPIs } from '../../../../apis/auth.api';
import { SignupProps, signupSchema } from './ResetPassword.constant';

const useResetForm = (
  handleSubmitOnClick: (account: SignupProps) => void,
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const method = useForm<SignupProps>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });
  const { handleSubmit, reset } = method;

  const handleReset = async (account: SignupProps) => {
    try {
      if (account.phoneNumber) {
        if (!isValidPhoneNumber(account.phoneNumber, 'VN')) throw new Error('Phone number is invalid.');
      }
      const phone = account.phoneNumber && parsePhoneNumber(account.phoneNumber, 'VN');
      if (phone) {
        account = { phoneNumber: phone.number };
      }
      console.log(account)
      handleSubmitOnClick(account);
      await authAPIs.sendOTP(account);
    } catch (error: AxiosError | any) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    handleReset,
    handleSubmit,
    method,
    reset
  };
};

export default useResetForm;
