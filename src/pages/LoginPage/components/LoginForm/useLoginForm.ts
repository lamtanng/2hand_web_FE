import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { handleError } from '../../../../utils/handleError';
import { loginSchema } from '../../Login.constant';
import { authAPIs } from '../../../../apis/auth.api';
import { useNavigate } from 'react-router-dom';
import { adminPaths } from '../../../../constants/apiPaths/adminPaths';
import { AccountProps } from '../../../../types/account.type';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { loginSelector } from '../../../../redux/slices/login.slice';

const useLoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { } = useAppSelector(loginSelector);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<AccountProps>({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (account: AccountProps) => {
    try {
      await authAPIs.login(account);

      //store jwt to redux

      // navigate(`ad/${adminPaths.dashboardPath}`);
    } catch (error: AxiosError | any) {
      handleError(error);
    }
  };

  return {
    handleLogin,
    control,
    handleSubmit,
    isSubmitting,
    isDirty,
  };
};

export default useLoginForm;
