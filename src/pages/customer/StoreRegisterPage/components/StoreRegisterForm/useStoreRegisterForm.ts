import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { StoreProps, storeSchema } from './StoreRegister.constants';

const useStoreForm = () => {
  const method = useForm<StoreProps>({
    resolver: yupResolver(storeSchema),
    // defaultValues: {},
  });
  const { handleSubmit, reset } = method;

  return {
    handleSubmit,
    method,
    reset,
  };
};

export default useStoreForm;
