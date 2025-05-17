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
import { DistrictAddressProps, ProvincesAddressProps, WardAddressProps } from '../../../../types/address.type';

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
  const [isGenerating, setGenerating] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [selectedProvince, setSelectedProvince] = useState<ProvincesAddressProps | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictAddressProps | null>(null);
  const [selectedWard, setSelectedWard] = useState<WardAddressProps | null>(null);
  const [isDefault, setDefault] = useState<boolean>(false);
  const [isSelectedDefault, setSelectedDefault] = useState<boolean>(false);
  const [base64Images, setBase64Images] = useState<string[]>([]);

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

  const isGeneratable = !description.trim() && base64Images.length === 0 ? true : false;

  const handleGenerateDescription = async () => {
    try {
      setGenerating(true);
      const images = base64Images.map((item: string) => {
        return { type: 'image_url', image_url: { url: item } };
      });
      const prompt = { type: 'text', text: description };
      const content = {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `I am a seller. Please help me create content for my product's description without format. `,
          },
          {
            role: 'user',
            content: [prompt, ...images],
          },
        ],
        stream: false,
        temperature: 1,
        n: 2,
      };
      const res = await productAPIs.generateProductDescription(content);
      console.log(res);
      setDescription(res.data.choices[0].message.content);
    } catch (error) {
      handleError(error);
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmitForm = (product: FormProductProps) => {
    const storeID = store && store._id && store._id;
    const newProduct: ProductRequestBodyProps = {
      name: product.name?.trim(),
      description: description.trim(),
      image: base64Images,
      price: product.price,
      quantity: quantity,
      quality: condition,
      cateID: selectedCategory?._id,
      storeID: storeID,
      weight: product.weight,
      height: product.height,
      length: product.length,
      width: product.width,
      address: {
        address: product.detailAddress,
        district: {
          DistrictID: selectedDistrict?.DistrictID,
          ProvinceID: selectedDistrict?.ProvinceID,
          DistrictName: selectedDistrict?.DistrictName?.trim(),
        },
        province: {
          ProvinceID: selectedProvince?.ProvinceID,
          ProvinceName: selectedProvince?.ProvinceName?.trim(),
        },
        ward: {
          WardCode: selectedWard?.WardCode,
          DistrictID: selectedWard?.DistrictID,
          WardName: selectedWard?.WardName?.trim(),
        },
        isDefault: isSelectedDefault,
      },
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
    if (store) {
      reset({
        detailAddress: store.address[0].address,
      });
      setSelectedDistrict(store.address[0].district);
      setSelectedProvince(store.address[0].province);
      setSelectedWard(store.address[0].ward);
      setDefault(store.address[0].isDefault);
    }
  }, [store]);

  useEffect(() => {
    if (currentProduct) {
      reset({
        name: currentProduct.name,
        price: currentProduct.price,
        weight: currentProduct.weight,
        height: currentProduct.height,
        length: currentProduct.length,
        width: currentProduct.width,
        detailAddress: currentProduct.address.address,
      });
      setCondition(currentProduct.quality);
      setQuantity(currentProduct.quantity);
      setSelectedCategory(currentProduct.cateID);
      setDescription(currentProduct.description);
      if (currentProduct.price === 0) {
        setFree(true);
      }
      setSelectedDistrict(currentProduct.address.district);
      setSelectedProvince(currentProduct.address.province);
      setSelectedWard(currentProduct.address.ward);
      setDefault(currentProduct.address.isDefault);
      setBase64Images(currentProduct.image);
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
    setDescription,
    selectedDistrict,
    selectedProvince,
    selectedWard,
    isDefault,
    setSelectedDistrict,
    setSelectedProvince,
    setSelectedWard,
    setDefault,
    quantity,
    setBase64Images,
    base64Images,
    setSelectedDefault,
    handleGenerateDescription,
    isGeneratable,
    isGenerating,
  };
};

export default useProductForm;
