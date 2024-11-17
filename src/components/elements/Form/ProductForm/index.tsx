import { FormProvider } from 'react-hook-form';
import { Checkbox, Flex, Form, InputNumber, Typography } from 'antd';
import CategoryDropdown from './components/CategoryDropdown';
import ImageUploader from './components/ImageUploader';
import { CategoryProps } from '../../../../types/category.type';
import { StoreProps } from '../../../../types/store.type';
import { ProductProps } from '../../../../types/product.type';
import useProductForm from './useProductForm';
import CustomFormItem from '../../ControlledComponents/ControlledInput';
import ConditionRadio from './components/ConditionRadio';
import SubmitButton from '../../Buttons/SubmitButton';
import TextEditor from '../../TextEditor';
import AddressForm from '../AddressForm';

const ProductForm = ({
  category,
  store,
  product,
}: {
  category: CategoryProps[];
  store: StoreProps | undefined;
  product?: ProductProps;
}) => {
  console.log('store', store)
  const {
    handleSubmitForm,
    handleSubmit,
    method,
    condition,
    setCondition,
    selectedCategory,
    setSelectedCategory,
    isFree,
    onFreeChange,
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
    quantity
  } = useProductForm(store, product);

  return (
    <FormProvider {...method}>
      <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit(handleSubmitForm)}>
        <Typography.Title level={3} className="m-0 mb-4">
          Product Images
        </Typography.Title>
        <Form.Item>
          <ImageUploader />
        </Form.Item>
        <Typography.Title level={3} className="m-0 mb-4">
          Product Information
        </Typography.Title>
        <CustomFormItem name="name" hint="Name" label="Product Name" isRequired={true} />
        <Flex gap={'large'} className="w-full">
          <Form.Item className="w-full">
            <Typography.Paragraph className="m-0 mt-0.5 pb-2">Category</Typography.Paragraph>
            <CategoryDropdown
              category={category}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </Form.Item>
          <Form.Item className="m-0 w-full">
            <Typography.Paragraph className="m-0 mt-0.5 pb-2">Quantity</Typography.Paragraph>
            <InputNumber
              min={1}
              defaultValue={quantity}
              onChange={(e) => {
                if (e) {
                  setQuantity(e);
                }
              }}
              className="h-10 w-full text-base"
            />
          </Form.Item>
          <Flex vertical className="w-full">
            <CustomFormItem name="price" hint="Price" label="Price" className="w-full" isDisabled={isFree} />
            <Checkbox onChange={onFreeChange} checked={isFree}>
              Free Product
            </Checkbox>
          </Flex>
        </Flex>
        <Form.Item>
          <Typography.Paragraph className="m-0 mb-2">Descripition</Typography.Paragraph>
          <TextEditor setValue={setDescription} value={description} />
        </Form.Item>
        <ConditionRadio onChange={setCondition} selected={condition} />
        <Typography.Title level={3} className="m-0 mb-4">
          Picking Information
        </Typography.Title>
        <Flex gap={'large'}>
          <CustomFormItem name="weight" hint="gram" label="Weight" className="w-full" />
          <CustomFormItem name="height" hint="cm" label="Height" className="w-full" />
          <CustomFormItem name="width" hint="cm" label="Width" className="w-full" />
          <CustomFormItem name="length" hint="cm" label="Length" className="w-full" />
        </Flex>
        <AddressForm
          isDefault={isDefault}
          selectedDistrict={selectedDistrict}
          selectedProvince={selectedProvince}
          selectedWard={selectedWard}
          setDefault={setDefault}
          setSelectedDistrict={setSelectedDistrict}
          setSelectedProvince={setSelectedProvince}
          setSelectedWard={setSelectedWard}
        />
        <Form.Item>
          <SubmitButton isSubmitting={isSubmitting} />
        </Form.Item>
      </Form>
    </FormProvider>
  );
};

export default ProductForm;
