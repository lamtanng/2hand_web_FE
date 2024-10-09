import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UserProps } from '../../../../types/user.type';
import { signupSchema } from './Signup.constant';
import { authAPIs } from '../../../../apis/auth.api';
import { AxiosError } from 'axios';
import { handleError } from '../../../../utils/handleError';

const useSignupForm = (
  handleSignupOnClick: (account: UserProps) => void,
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const method = useForm<UserProps>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const { handleSubmit, reset } = method;

  const handleSignup = async (account: UserProps) => {
    try {
      setSubmitting(true);
      await authAPIs.signup(account);
      handleSignupOnClick(account);
      reset();
      setSubmitting(false);
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
