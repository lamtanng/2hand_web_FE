import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useNavigate } from 'react-router-dom';
import { StoreProps } from '../../../../types/store.type';
import { ProductProps } from '../../../../types/product.type';
import { FormProductProps, productSchema } from './ProductForm.constants';
import { ProductQuality } from '../../../../types/enum/productQuality.enum';
import { CategoryProps } from '../../../../types/category.type';
import { ProductRequestBodyProps } from '../../../../types/http/product.type';
import { productAPIs } from '../../../../apis/product.api';
import { displaySuccess } from '../../../../utils/displayToast';
import { handleError } from '../../../../utils/handleError';

const useProductForm = (store: StoreProps | undefined, currentProduct: ProductProps | undefined) => {
  const navigate = useNavigate();
  const method = useForm<FormProductProps>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: '',
    },
  });
  const { handleSubmit, reset } = method;

  const [condition, setCondition] = useState<string | undefined>(ProductQuality.New);
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps>();
  const [isFree, setFree] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');

  const onFreeChange = (e: CheckboxChangeEvent) => {
    let isSelected = e.target.checked;
    const currentValues = method.getValues();

    if (isSelected) {
      setFree(true);
      reset({
        ...currentValues,
        price: 0,
      });
    } else {
      setFree(false);
      reset({
        ...currentValues,
        price: undefined,
      });
    }
  };

  const handleAddProduct = async (data: ProductRequestBodyProps) => {
    try {
      setSubmitting(true);
      const res = await productAPIs.addProduct(data);
      displaySuccess('Product is added successfully');
      navigate(`/${res.data.slug}`);
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateProduct = async (data: ProductRequestBodyProps) => {
    try {
      setSubmitting(true);
      await productAPIs.updateProduct(data);
      displaySuccess('Product is updated successfully');
      navigate(-1);
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitForm = (product: FormProductProps) => {
    const newProduct: ProductRequestBodyProps = {
      name: product.name,
      description: description,
      image: [],
      price: product.price,
      quantity: quantity,
      quality: condition,
      weight: product.weight,
      cateID: selectedCategory?._id,
      storeID: store?._id,
    };

    const updateProduct: ProductRequestBodyProps = {
      _id: currentProduct?._id,
      ...newProduct,
    };
    if (currentProduct) {
      handleUpdateProduct(updateProduct);
    } else {
      handleAddProduct(newProduct);
    }
  };

  useEffect(() => {
    if (currentProduct) {
      reset({
        name: currentProduct.name,
        price: currentProduct.price,
        weight: currentProduct.weight,
      });
      setCondition(currentProduct.quality);
      setQuantity(currentProduct.quantity);
      setSelectedCategory(currentProduct.cateID);
      setDescription(currentProduct.description);
      if (currentProduct.price === 0) {
        setFree(true);
      }
    }
  }, [currentProduct]);

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
    handleSubmitForm,
    setQuantity,
    isSubmitting,
    description,
    setDescription
  };
};

export default useProductForm;
