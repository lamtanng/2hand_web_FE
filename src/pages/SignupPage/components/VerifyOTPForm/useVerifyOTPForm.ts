import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../../../../utils/handleError';
import { UserProps } from '../../../../types/user.type';
import { VerifyProps, verifySchema } from './VerifyOTP.constant';
import { useAppDispatch } from '../../../../redux/hooks';
import { authAPIs } from '../../../../apis/auth.api';
import { storeAuth } from '../../../../redux/slices/login.slice';
import { displaySuccess } from '../../../../utils/displayToast';

const useVerifyForm = (
  account: UserProps,
  handleResendClick: () => void,
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  setIsResent: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const method = useForm<VerifyProps>({
    resolver: yupResolver(verifySchema),
    defaultValues: {
      otp: [],
    },
  });
  const { handleSubmit, reset } = method;

  const handleVerify = async (verifyingCode: VerifyProps) => {
    try {
      setSubmitting(true);
      const sentOTP = verifyingCode.otp?.join('');
      account = { email: account.email, password: account.password, otp: sentOTP };
      await authAPIs.verifyOTP(account);
      const user: UserProps = {email: account.email, password: account.password};
      const loginRes = await authAPIs.login(user);
      dispatch(storeAuth(loginRes));
      setSubmitting(false);
      navigate('/');
    } catch (error: AxiosError | any) {
      handleError(error);
    }
  };

  const handleResend = async () => {
    try {
      setIsResent(true);
      account = { email: account.email };
      await authAPIs.resendOTP(account);
      displaySuccess('OTP is resent successfully. Please check your email.');
      handleResendClick();
      reset();
      setIsResent(false);
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
