import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authAPIs } from '../../../../apis/auth.api';
import { adminPaths } from '../../../../constants/apiPaths/adminPaths';
import { useAppDispatch } from '../../../../redux/hooks';
import { storeAuth } from '../../../../redux/slices/login.slice';
import { handleError } from '../../../../utils/handleError';
import { loginSchema } from '../../Login.constant';
import { UserProps } from '../../../../types/user.type';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

const useLoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const method = useForm<UserProps>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      // email: '',
      phoneNumber: '',
      password: '',
    },
  });
  const { handleSubmit, reset } = method;

  const handleLogin = async (account: UserProps) => {
    try {
      if (account.phoneNumber) {
        if (!isValidPhoneNumber(account.phoneNumber, "VN")) throw new Error('Phone number is invalid.');
      }
      let newPhone: string | undefined;
      const phone = account.phoneNumber && parsePhoneNumber(account.phoneNumber, 'VN');
      if (phone) {
        newPhone = phone.number;
      }
      account = { ...account, phoneNumber: newPhone };
      const res = await authAPIs.login(account);
      dispatch(storeAuth(res));
      navigate(`/${adminPaths.adminPath}/${adminPaths.dashboardPath}`);
      reset();
    } catch (error: AxiosError | any) {
      handleError(error);
    }
  };

  return {
    handleLogin,
    handleSubmit,
    method,
  };
};

export default useLoginForm;
