import { FormProvider } from 'react-hook-form';
import { Button, Checkbox, Flex, Form, InputNumber, Typography } from 'antd';
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
import { useNavigate } from 'react-router-dom';

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
    description,
    setDescription,
    selectedDistrict,
    selectedProvince,
    selectedWard,
    isDefault,
    setSelectedDistrict,
    setSelectedProvince,
    setSelectedWard,
    setSelectedDefault,
    quantity,
    base64Images,
    setBase64Images,
    handleGenerateDescription,
    isGeneratable,
    isGenerating,
  } = useProductForm(store, product);

  const navigate = useNavigate();

  return (
    <FormProvider {...method}>
      <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit(handleSubmitForm)}>
        <Typography.Title level={3} className="m-0 mb-4">
          Product Images
        </Typography.Title>
        <Form.Item>
          <ImageUploader base64Images={base64Images} setBase64Images={setBase64Images} />
        </Form.Item>
        <Typography.Title level={3} className="m-0 mb-4">
          Product Information
        </Typography.Title>
        <CustomFormItem name="name" hint="Name" label="Product Name" isRequired={true} />
        <Flex gap={'large'} className="w-full">
          <Form.Item className="w-full" rules={[{ required: true, message: 'Please input!' }]}>
            <Typography.Paragraph className="m-0 mt-0.5 pb-2">
              Category <span className="text-red-600">*</span>
            </Typography.Paragraph>
            <CategoryDropdown
              category={category}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </Form.Item>
          <Form.Item className="m-0 w-full" rules={[{ required: true, message: 'Please input!' }]}>
            <Typography.Paragraph className="m-0 mt-0.5 pb-2">
              Quantity <span className="text-red-600">*</span>
            </Typography.Paragraph>
            <InputNumber
              min={1}
              value={quantity}
              onChange={(e) => {
                if (e) {
                  setQuantity(e);
                }
              }}
              className="h-10 w-full text-base"
            />
          </Form.Item>
          <Flex vertical className="w-full">
            <CustomFormItem
              name="price"
              hint="Price"
              label="Price"
              className="w-full"
              isDisabled={isFree}
              isRequired={true}
            />
            <Checkbox onChange={onFreeChange} checked={isFree}>
              Free Product
            </Checkbox>
          </Flex>
        </Flex>
        <Form.Item rules={[{ required: true, message: 'Please input.' }]}>
          <Typography.Paragraph className="m-0 mb-2">
            Descripition <span className="text-red-600">*</span>
          </Typography.Paragraph>
          <TextEditor setValue={setDescription} value={description} />
        </Form.Item>
        <Flex justify="end" className="w-full">
          <Form.Item>
            <Button
              className="h-10 w-full text-base"
              type="primary"
              onClick={handleGenerateDescription}
              disabled={isGeneratable}
              loading={isGenerating}
            >
              Generate Description
            </Button>
          </Form.Item>
        </Flex>
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
          setSelectedDefault={setSelectedDefault}
          setSelectedDistrict={setSelectedDistrict}
          setSelectedProvince={setSelectedProvince}
          setSelectedWard={setSelectedWard}
        />
        <Flex gap={'large'} justify="center">
          <Form.Item className="w-1/4">
            <Button
              variant="outlined"
              color="primary"
              className="h-10 w-full text-base"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
          </Form.Item>
          <Form.Item className="w-1/4">
            <SubmitButton isSubmitting={isSubmitting} />
          </Form.Item>
        </Flex>
      </Form>
    </FormProvider>
  );
};

export default ProductForm;
