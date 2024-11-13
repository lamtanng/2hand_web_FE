import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormProductProps, productSchema } from './ProductForm.constants';
import { useState } from 'react';
import { ProductQuality } from '../../../../../types/enum/productQuality.enum';
import { CategoryProps } from '../../../../../types/category.type';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { handleError } from '../../../../../utils/handleError';
import { StoreProps } from '../../../../../types/store.type';
import { displaySuccess } from '../../../../../utils/displayToast';
import { productAPIs } from '../../../../../apis/product.api';
import { useNavigate } from 'react-router-dom';
import { ProductRequestBodyProps } from '../../../../../types/http/product.type';

const useProductForm = (store: StoreProps | undefined) => {
  const navigate = useNavigate();
  const method = useForm<FormProductProps>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      description: '',
      name: '',
    },
  });
  const { handleSubmit, reset } = method;

  const [condition, setCondition] = useState(ProductQuality.New);
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps>();
  const [isFree, setFree] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number | null>(1);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const onFreeChange = (e: CheckboxChangeEvent) => {
    let isSelected = e.target.checked;
    const currentValues = method.getValues();

    if (isSelected) {
      setFree(true);
      reset({
        ...currentValues,
        price: 0,
      })
    } else {
      setFree(false);
      reset({
        ...currentValues,
        price: undefined,
      })
    }
  };

  const handleAddProduct = async (product: FormProductProps) => {
    try {
      setSubmitting(true);
      const data: ProductRequestBodyProps = {
        name: product.name,
        description: product.description,
        image: [],
        price: product.price,
        quantity: quantity,
        quality: condition,
        weight: product.weight,
        cateID: selectedCategory?._id,
        storeID: store?._id
      };
      const res = await productAPIs.addProduct(data);
      displaySuccess('Product is added successfully');
      navigate(`/${res.data.slug}`);
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    handleSubmit,
    method,
    reset,
    condition,
    setCondition,
    selectedCategory,
    setSelectedCategory,
    isFree,
    onFreeChange,
    handleAddProduct,
    setQuantity,
    isSubmitting
  };
};

export default useProductForm;
