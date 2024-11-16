import { Divider, Flex, Form, Typography } from 'antd';
import { FormProvider } from 'react-hook-form';
import useStoreProfileForm from './useStoreProfileForm';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import useAccountPage from '../AccountPage/useAccountPage';
import CustomFormItem from '../../../components/elements/ControlledComponents/ControlledInput';
import AddressForm from '../../../components/elements/Form/AddressForm';
import SubmitButton from '../../../components/elements/Buttons/SubmitButton';
import UploadAvatar from './components/UploadAvatar';

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
  } = useStoreProfileForm(profile);

  const [value, setValue] = useState('');
  return (
    <div id="container" className="px-12 py-5">
      <Flex justify="space-between" align="center">
        <div id="title">
          <Typography.Title level={3}>Store Profile</Typography.Title>
        </div>
      </Flex>
      <Divider />
      <div id="profile">
        <Flex gap={50} justify="space-between" align="center" className="px-10">
          <div className="w-2/3">
            <FormProvider {...method}>
              <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit}>
                <Typography.Paragraph className="m-0 mb-6 text-base">Store ID: ID</Typography.Paragraph>
                <CustomFormItem name="storeName" hint="Store's name" label="Store's Name" isRequired={true} />
                <Form.Item>
                  <ReactQuill theme="snow" value={value} onChange={setValue} />
                </Form.Item>
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
          </div>
          <Divider type="vertical" className="h-96" />
          <div className="w-1/3">
            <UploadAvatar />
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default StoreProfile;
