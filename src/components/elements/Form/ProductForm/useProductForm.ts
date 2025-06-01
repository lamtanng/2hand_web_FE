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
import { PromptType } from '../../../../types/enum/promptType.enum';
import { openAIAPIs } from '../../../../apis/openai.api';

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
  const [generatedDescription, setGeneratedDescription] = useState<string>('');
  const [isPreviewOpen, setPreviewOpen] = useState<boolean>(false);
  const [isWarningOpen, setWarningOpen] = useState<boolean>(false);
  const [violatingImages, setViolatingImages] = useState<number[]>([]);
  const [violatingTexts, setViolatingTexts] = useState<string[]>([]);
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
      console.log(res);
      // displaySuccess('Product is added successfully');
      // navigate(`/${res.data.slug}`);
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

  const isGeneratable = !description && base64Images.length === 0 ? true : false;

  const handleGenerateDescription = async (showPreview = true) => {
    try {
      setGenerating(true);
      const data = method.getValues();
      const images = base64Images.map((item: string) => {
        return { type: 'image_url', image_url: { url: item } };
      });
      const prompt = [
        { type: 'text', text: description },
        { type: 'text', text: data.name },
      ];
      const content = {
        promptType: PromptType.ProductDescription,
        content: [...prompt, ...images],
      };
      const res = await openAIAPIs.integrateAI(content);
      setGeneratedDescription(res.data[0]);

      // Only open the preview modal if showPreview is true
      if (showPreview) {
        setPreviewOpen(true);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setGenerating(false);
    }
  };

  const handleAcceptGenerated = () => {
    setDescription(generatedDescription);
    setPreviewOpen(false);
    setGeneratedDescription('');
  };

  const handleRejectGenerated = () => {
    setPreviewOpen(false);
    setGeneratedDescription('');
  };

  const handleSubmitForm = async (data: FormProductProps) => {
    // Check for potential community standard violations
    try {
      const res = await openAIAPIs.checkCommunityStandards([description, data.name], base64Images);
      console.log(res);
      if (!res.data.status) {
        setViolatingImages(res.data.images);
        setViolatingTexts(res.data.text);

        // Auto-generate a new description if text violations are detected
        // Pass false to prevent opening the preview modal
        if (res.data.text && res.data.text.length > 0) {
          handleGenerateDescription(false);
        }

        setWarningOpen(true);
        return;
      }
    } catch (error) {
      handleError(error);
    }

    // If no violations, proceed with submission
    submitProduct(data);
  };

  // Submit the product regardless of violations
  const handleBypassWarning = () => {
    const data = method.getValues();
    submitProduct(data, false);
    setWarningOpen(false);
  };

  // Common submission logic for both normal and bypass paths
  const submitProduct = (data: FormProductProps, isApproved: boolean = true) => {
    const storeID = store && store._id && store._id;
    const newProduct: ProductRequestBodyProps = {
      name: data.name?.trim(),
      description: description.trim(),
      image: base64Images,
      price: data.price,
      quantity: quantity,
      quality: condition,
      cateID: selectedCategory?._id,
      storeID: storeID,
      weight: data.weight,
      height: data.height,
      length: data.length,
      width: data.width,
      address: {
        address: data.detailAddress,
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
      isApproved: isApproved,
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

  // Handle editing after warning
  const handleEditAfterWarning = () => {
    setWarningOpen(false);
    setDescription(generatedDescription);
    // Scroll to top or to the specific field with violation
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    generatedDescription,
    isPreviewOpen,
    setPreviewOpen,
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
    handleAcceptGenerated,
    handleRejectGenerated,
    isWarningOpen,
    setWarningOpen,
    handleEditAfterWarning,
    violatingImages,
    setViolatingImages,
    violatingTexts,
    handleBypassWarning,
  };
};

export default useProductForm;
