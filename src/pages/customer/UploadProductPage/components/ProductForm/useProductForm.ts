import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormProductProps, productSchema } from './ProductForm.constants';

const useProductForm = () => {
  const method = useForm<FormProductProps>({
    resolver: yupResolver(productSchema),
    defaultValues: {
    },
  });
  const { handleSubmit, reset } = method;

  return {
    handleSubmit,
    method,
    reset,
  };
};

export default useProductForm;
