import { Divider, Flex, Form, Typography } from 'antd';
import { FormProvider } from 'react-hook-form';
import useStoreProfileForm from './useStoreProfileForm';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useAccountPage from '../AccountPage/useAccountPage';
import CustomFormItem from '../../../components/elements/ControlledComponents/ControlledInput';
import AddressForm from '../../../components/elements/Form/AddressForm';
import SubmitButton from '../../../components/elements/Buttons/SubmitButton';
import PageSpin from '../../../components/elements/Spin/PageSpin';

const StoreProfile = () => {
  const { profile } = useAccountPage();
  const {
    method,
    handleSubmit,
    selectedDistrict,
    selectedProvince,
    selectedWard,
    setDefault,
    setSelectedDistrict,
    setSelectedProvince,
    setSelectedWard,
    isDefault,
    isSubmitting,
    store,
    setValue,
    value,
    updateStore,
    isLoading,
  } = useStoreProfileForm(profile);

  return (
    <div id="container" className="px-12 py-5">
      {isLoading ? (
        <PageSpin />
      ) : (
        <>
          <Flex justify="space-between" align="center">
            <div id="title">
              <Typography.Title level={3}>Store Information</Typography.Title>
            </div>
          </Flex>
          <Divider />
          <div id="profile">
            <Flex gap={50} justify="space-between" align="center" className="px-10">
              <div className="w-full">
                <FormProvider {...method}>
                  <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit(updateStore)}>
                    <Typography.Paragraph className="m-0 mb-6 text-base">Store ID: {store?._id}</Typography.Paragraph>
                    <CustomFormItem name="storeName" hint="Store's name" label="Store's Name" isRequired={true} maxLength={50} />
                    <Form.Item>
                      <Typography.Paragraph className="m-0 mb-[10px]">
                        Description <span className="text-red-600">*</span>:{' '}
                      </Typography.Paragraph>
                      <ReactQuill theme="snow" value={value} onChange={setValue} />
                    </Form.Item>
                    <AddressForm
                      isDefault={isDefault}
                      selectedDistrict={selectedDistrict}
                      selectedProvince={selectedProvince}
                      selectedWard={selectedWard}
                      setSelectedDefault={setDefault}
                      setSelectedDistrict={setSelectedDistrict}
                      setSelectedProvince={setSelectedProvince}
                      setSelectedWard={setSelectedWard}
                    />
                    <Form.Item>
                      <SubmitButton isSubmitting={isSubmitting} />
                    </Form.Item>
                  </Form>
                </FormProvider>
              </div>
            </Flex>
          </div>
        </>
      )}
    </div>
  );
};

export default StoreProfile;
