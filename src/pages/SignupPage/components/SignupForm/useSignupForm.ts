import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UserProps } from '../../../../types/user.type';
import { signupSchema } from './Signup.constant';
import { authAPIs } from '../../../../apis/auth.api';
import { AxiosError } from 'axios';
import { handleError } from '../../../../utils/handleError';

const useSignupForm = (handleSignupOnClick: (account: UserProps) => void) => {
  const method = useForm<UserProps>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    }
  });
  const { handleSubmit, reset } = method;

  const handleSignup = async (account: UserProps) => {
    try {
      console.log(account);
      handleSignupOnClick(account);
      reset();
      await authAPIs.signup(account);
    } catch (error: AxiosError | any) {
      handleError(error);
    }
  };

  return {
    handleSignup,
    handleSubmit,
    method,
  };
};

export default useSignupForm;
