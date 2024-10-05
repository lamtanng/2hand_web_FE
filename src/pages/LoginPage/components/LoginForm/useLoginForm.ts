import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authAPIs } from '../../../../apis/auth.api';
import { adminPaths } from '../../../../constants/apiPaths/adminPaths';
import { useAppDispatch } from '../../../../redux/hooks';
import { storeAuth } from '../../../../redux/slices/login.slice';
import { AccountProps } from '../../../../types/account.type';
import { handleError } from '../../../../utils/handleError';
import { loginSchema } from '../../Login.constant';

const useLoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<AccountProps>({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (account: AccountProps) => {
    try {
      const res = await authAPIs.login(account);
      dispatch(storeAuth(res));
      navigate(`/${adminPaths.adminPath}/${adminPaths.dashboardPath}`);
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
