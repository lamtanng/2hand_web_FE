import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../../../../utils/handleError';
import { UserProps } from '../../../../types/user.type';
import { verifySchema } from './VerifyOTP.constant';
import { useAppDispatch } from '../../../../redux/hooks';
import { authAPIs } from '../../../../apis/auth.api';
import { storeAuth } from '../../../../redux/slices/login.slice';
import { displaySuccess } from '../../../../utils/displayToast';

const useVerifyForm = (account: UserProps, handleResendClick: () => void) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const method = useForm<UserProps>({
    resolver: yupResolver(verifySchema),
    defaultValues: {
      otp: '',
    }
  });
  const { handleSubmit, reset } = method;

  const handleVerify = async (verifyingAccount: UserProps) => {
    try {
      account = {email: account.email, password: account.password, otp: verifyingAccount.otp}
      await authAPIs.verifyOTP(account);
      const user: UserProps = {email: account.email, password: account.password};
      const loginRes = await authAPIs.login(user);
      dispatch(storeAuth(loginRes));
      navigate('/');
    } catch (error: AxiosError | any) {
      handleError(error);
    }
  };

  const handleResend = async () => {
    try {
      handleResendClick();
      account = {email: account.email};
      console.log(account)
      await authAPIs.resendOTP(account);
      displaySuccess('OTP is resent successfully. Please check your email.')
    } catch (error: AxiosError | any) {
      handleError(error);
    }
  };

  return {
    handleVerify,
    handleResend,
    handleSubmit,
    method,
    reset,
  };
};

export default useVerifyForm;
