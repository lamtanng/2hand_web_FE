import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AddressProps, addressSchema } from '../../Address.constants';

const useAddressForm = () => {
  const method = useForm<AddressProps>({
    resolver: yupResolver(addressSchema),
    defaultValues: {},
  });
  const { handleSubmit, reset } = method;

  return {
    handleSubmit,
    method,
    reset,
  };
};

export default useAddressForm;
