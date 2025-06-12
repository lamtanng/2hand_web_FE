import { Button, Flex, Form, InputNumber, Spin, Typography } from 'antd';
import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AIIcon from '../../../../assets/ai-icon.webp';
import { CategoryProps } from '../../../../types/category.type';
import { ProductProps } from '../../../../types/product.type';
import { StoreProps } from '../../../../types/store.type';
import SubmitButton from '../../Buttons/SubmitButton';
import CustomFormItem from '../../ControlledComponents/ControlledInput';
import TextEditor from '../../TextEditor';
import AddressForm from '../AddressForm';
import CategoryDropdown from './components/CategoryDropdown';
import CommunityStandardWarning from './components/CommunityStandardWarning';
import ConditionRadio from './components/ConditionRadio';
import DescriptionPreview from './components/DescriptionPreview';
import ImageUploader from './components/ImageUploader';
import useProductForm from './useProductForm';

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
    isGenerating,
    generatedDescription,
    isPreviewOpen,
    handleAcceptGenerated,
    handleRejectGenerated,
    isWarningOpen,
    setWarningOpen,
    handleEditAfterWarning,
    violatingImages,
    setViolatingImages,
    violatingTexts,
    handleBypassWarning,
    setSubmitting,
  } = useProductForm(store, product);

  const navigate = useNavigate();

  return (
    <FormProvider {...method}>
      <Spin spinning={isSubmitting} tip="Submitting..." size="large">
        <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit(handleSubmitForm)}>
          <Typography.Title level={3} className="m-0 mb-4">
            Product Images
          </Typography.Title>
          <Form.Item>
            <ImageUploader
              base64Images={base64Images}
              setBase64Images={setBase64Images}
              violatingImages={violatingImages}
              setViolatingImages={setViolatingImages}
            />
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
            <div className="flex w-full flex-col gap-1">
              <CustomFormItem
                name="price"
                hint="Price"
                label="Price"
                className="w-full"
                isDisabled={isFree}
                isRequired={true}
              />
              {/* <Checkbox onChange={onFreeChange} checked={isFree}>
              Free Product
            </Checkbox> */}
            </div>
          </Flex>
          <Form.Item rules={[{ required: true, message: 'Please input.' }]}>
            <Flex justify="space-between">
              <Typography.Paragraph className="m-0 mb-2 text-sm">
                Descripition <span className="text-red-600">*</span>
              </Typography.Paragraph>

              <Button
                className="h-10 text-base font-bold"
                type="link"
                size="small"
                icon={<img src={AIIcon} alt="AI" className="h-5 w-5" />}
                onClick={() => handleGenerateDescription(true)}
                // disabled={isGeneratable}
                loading={isGenerating}
              >
                Ask AI
              </Button>
            </Flex>
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
            setSelectedDefault={setSelectedDefault}
            setSelectedDistrict={setSelectedDistrict}
            setSelectedProvince={setSelectedProvince}
            setSelectedWard={setSelectedWard}
          />
          <DescriptionPreview
            isOpen={isPreviewOpen}
            currentDescription={description}
            generatedDescription={generatedDescription}
            onAccept={handleAcceptGenerated}
            onReject={handleRejectGenerated}
            onRegenerate={() => handleGenerateDescription(true)}
            isGenerating={isGenerating}
          />
          <CommunityStandardWarning
            isOpen={isWarningOpen}
            onClose={() => {
              setWarningOpen(false);
              setSubmitting(false);
            }}
            onEdit={handleEditAfterWarning}
            currentDescription={description}
            generatedDescription={generatedDescription}
            isGenerating={isGenerating}
            onRegenerate={handleGenerateDescription}
            base64Images={base64Images}
            setBase64Images={setBase64Images}
            violatingImages={violatingImages}
            setViolatingImages={setViolatingImages}
            violatingTexts={violatingTexts}
            onBypass={handleBypassWarning}
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
      </Spin>
    </FormProvider>
  );
};

export default ProductForm;
