import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../../../../utils/handleError';
import { UserProps } from '../../../../types/user.type';
import { useVerifyFormProps, VerifyProps, verifySchema } from './VerifyOTP.constant';
import { useAppDispatch } from '../../../../redux/hooks';
import { authAPIs } from '../../../../apis/auth.api';
import { storeAuth } from '../../../../redux/slices/login.slice';
import { displaySuccess } from '../../../../utils/displayToast';

const useVerifyForm = ({
  account,
  handleResendClick,
  setSubmitting,
  setCounting,
  setIsResent,
  setDisable,
  setHidden,
  setIsDirty,
}: useVerifyFormProps) => {
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
      const user: UserProps = { email: account.email, password: account.password };
      const loginRes = await authAPIs.login(user);
      dispatch(storeAuth(loginRes));
      navigate('/');
    } catch (error: AxiosError | any) {
      handleError(error);
      console.log(error.statusCode);
      if (error.statusCode === 410) {
        setCounting(false);
        setDisable(false);
        setHidden(true);
        setIsDirty(false);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      setIsResent(true);
      account = { email: account.email };
      await authAPIs.resendOTP(account);
      displaySuccess('OTP is resent successfully. Please check your email.');
      handleResendClick();
    } catch (error: AxiosError | any) {
      handleError(error);
    } finally {
      reset();
      setIsResent(false);
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
