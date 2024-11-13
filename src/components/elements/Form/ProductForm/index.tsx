import { FormProvider } from 'react-hook-form';
import { Checkbox, Flex, Form, InputNumber, Typography } from 'antd';
import CategoryDropdown from './components/CategoryDropdown';
import ImageUploader from './components/ImageUploader';
import { CategoryProps } from '../../../../types/category.type';
import { StoreProps } from '../../../../types/store.type';
import { ProductProps } from '../../../../types/product.type';
import useProductForm from './useProductForm';
import CustomFormItem from '../../ControlledComponents/ControlledInput';
import CustomTextArea from '../../ControlledComponents/ControlledTextArea';
import ConditionRadio from './components/ConditionRadio';
import SubmitButton from '../../Buttons/SubmitButton';

const ProductForm = ({
  category,
  store,
  product,
}: {
  category: CategoryProps[];
  store: StoreProps | undefined;
  product?: ProductProps;
}) => {
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
  } = useProductForm(store, product);

  return (
    <FormProvider {...method}>
      <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit(handleSubmitForm)}>
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
                if (e) {
                  setQuantity(e);
                }
              }}
              className="h-10 w-full text-base"
            />
          </Form.Item>
          <CustomFormItem name="weight" hint="Weight" label="Weight" className="w-full" />
          <Flex vertical className="w-full">
            <CustomFormItem name="price" hint="Price" label="Price" className="w-full" isDisabled={isFree} />
            <Checkbox onChange={onFreeChange} checked={isFree}>
              Free Product
            </Checkbox>
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
