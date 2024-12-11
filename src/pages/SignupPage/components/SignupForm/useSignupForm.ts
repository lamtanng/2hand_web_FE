import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { parsePhoneNumber } from 'libphonenumber-js';
import { useForm } from 'react-hook-form';
import { SignupRequestProps } from '../../../../types/http/signup.type';
import { handleError } from '../../../../utils/handleError';
import { SignupProps, signupSchema } from './Signup.constant';
import { authAPIs } from '../../../../apis/auth.api';

const useSignupForm = (
  handleSignupOnClick: (account: SignupProps) => void,
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

  const handleSignup = async (account: SignupProps) => {
    try {
      setSubmitting(true);
      console.log(account);
      const newPhone = account.phoneNumber && parsePhoneNumber(account.phoneNumber, 'VN');
      let newUser: SignupRequestProps = account;
      if (newPhone) {
        newUser = {
          ...account,
          phoneNumber: newPhone.number,
        };
      }
      console.log('new user: ', newUser);
      await authAPIs.signup(newUser);
      handleSignupOnClick(account);
      reset();
    } catch (error: AxiosError | any) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    handleSignup,
    handleSubmit,
    method,
  };
};

export default useSignupForm;
