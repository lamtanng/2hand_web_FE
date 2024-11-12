import useStoreForm from './useStoreRegisterForm';
import { FormProvider } from 'react-hook-form';
import CustomFormItem from '../../../../../components/elements/ControlledComponents/ControlledInput';
import { Flex, Form, Radio, Tag, Typography } from 'antd';
import SubmitButton from '../../../../../components/elements/Buttons/SubmitButton';
import CustomTextArea from '../../../../../components/elements/ControlledComponents/ControlledTextArea';
import AddressForm from '../../../../../components/elements/Form/AddressForm';
import { AddressProps } from '../../../../../types/address.type';

const StoreRegisterForm = () => {
  const {
    method,
    handleSubmit,
    handleStoreRegister,
    selectedDistrict,
    selectedProvince,
    selectedWard,
    setDefault,
    setSelectedDistrict,
    setSelectedProvince,
    setSelectedWard,
    isDefault,
    profile,
    handleChooseAddress
  } = useStoreForm();

  return (
    <>
    <div className="mb-5 rounded-xl bg-white p-8 shadow-sm">
      <FormProvider {...method}>
        <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit(handleStoreRegister)}>
          <CustomFormItem name="name" hint="Name" label="Store Name" isRequired={true} />
          <CustomTextArea name="description" hint="Description" label="Description" isRequired={true} />
          <CustomFormItem name="phoneNumber" hint="Phone number" label="Phone number" isDisabled={true} />
          <Typography.Paragraph className="m-0 -mt-4 mb-6 text-xs italic text-gray-500">
            *Note: We will use your phone number for your store.
          </Typography.Paragraph>
          <Form.Item>
            <Typography.Paragraph>Recommend Address</Typography.Paragraph>
            <Radio.Group className="w-full" onChange={handleChooseAddress} defaultValue={"new"}>
              <Flex vertical gap={'large'}>
                {profile?.address?.map((address: AddressProps) => (
                  <Radio value={address} className="mx-0 w-full">
                    <Flex justify="space-between" gap={'large'}>
                      <Typography.Paragraph className="m-0 text-base">
                        {`${address.address}, ${address.ward?.WardName}, ${address.district?.DistrictName}, ${address.province?.ProvinceName}`}
                      </Typography.Paragraph>
                      {address.isDefault && <Tag color="geekblue">Default</Tag>}
                    </Flex>
                  </Radio>
                ))}
                <Radio value={'new'} className="mx-0 w-full">
                    <Flex justify="space-between" gap={'large'}>
                      <Typography.Paragraph className="m-0 text-base">
                        New Address
                      </Typography.Paragraph>
                    </Flex>
                  </Radio>
              </Flex>
            </Radio.Group>
          </Form.Item>
          <AddressForm
            selectedDistrict={selectedDistrict}
            selectedProvince={selectedProvince}
            selectedWard={selectedWard}
            setDefault={setDefault}
            setSelectedDistrict={setSelectedDistrict}
            setSelectedProvince={setSelectedProvince}
            setSelectedWard={setSelectedWard}
            isDefault={isDefault}
          />
          <Form.Item>
            <SubmitButton />
          </Form.Item>
        </Form>
      </FormProvider>
    </div>
    
    </>
  );
};

export default StoreRegisterForm;
