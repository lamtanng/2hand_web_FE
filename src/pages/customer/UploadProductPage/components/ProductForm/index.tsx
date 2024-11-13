import { FormProvider } from 'react-hook-form';
import useProductForm from './useProductForm';
import { Checkbox, Flex, Form, InputNumber, Typography } from 'antd';
import CustomFormItem from '../../../../../components/elements/ControlledComponents/ControlledInput';
import CustomTextArea from '../../../../../components/elements/ControlledComponents/ControlledTextArea';
import SubmitButton from '../../../../../components/elements/Buttons/SubmitButton';
import ConditionRadio from '../ConditionRadio';
import { CategoryProps } from '../../../../../types/category.type';
import { StoreProps } from '../../../../../types/store.type';
import CategoryDropdown from './components/CategoryDropdown';
import ImageUploader from './components/ImageUploader';

const ProductForm = ({ category, store }: { category: CategoryProps[]; store: StoreProps | undefined }) => {
  const {
    handleAddProduct,
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
  } = useProductForm(store);

  return (
    <FormProvider {...method}>
      <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit(handleAddProduct)}>
        <Form.Item>
          <ImageUploader />
        </Form.Item>
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
              defaultValue={1}
              onChange={(e) => {
                setQuantity(e);
              }}
              className="h-10 w-full text-base"
            />
          </Form.Item>
          <CustomFormItem name="weight" hint="Weight" label="Weight" className="w-full" />
          <Flex vertical className="w-full">
            <CustomFormItem name="price" hint="Price" label="Price" className="w-full" isDisabled={isFree} />
            <Checkbox onChange={onFreeChange}>Free Product</Checkbox>
          </Flex>
        </Flex>
        <CustomTextArea name="description" hint="Description" label="Description" isRequired={true} />
        <ConditionRadio onChange={setCondition} selected={condition} />
        <Form.Item>
          <SubmitButton isSubmitting={isSubmitting} />
        </Form.Item>
      </Form>
    </FormProvider>
  );
};

export default ProductForm;
