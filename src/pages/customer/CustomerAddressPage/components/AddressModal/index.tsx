import { CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Form, Typography } from 'antd';
import { FormProvider } from 'react-hook-form';
import useAddressModal from './useAddressModal';
import { AddressProps } from '../../../../../types/address.type';
import { UserProps } from '../../../../../types/user.type';
import AddressForm from '../../../../../components/elements/Form/AddressForm';
import SubmitButton from '../../../../../components/elements/Buttons/SubmitButton';

const AddressModal = ({
  profile,
  address,
  isModalOpen,
  setIsModalOpen,
}: {
  profile: UserProps | undefined;
  address?: AddressProps;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    handleSubmit,
    method,
    selectedDistrict,
    selectedProvince,
    selectedWard,
    setSelectedDistrict,
    setSelectedProvince,
    setSelectedWard,
    handleClose,
    isSubmitting,
    isDefault,
    submitButtonClick,
    setSelectedDefault,
  } = useAddressModal(setIsModalOpen, address, profile);

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-30 flex items-center justify-center transition-colors ${isModalOpen ? 'visible bg-black/20' : 'invisible'} `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-h-screen w-1/2 rounded-xl bg-white p-6 shadow transition-all ${isModalOpen ? 'scale-100 opacity-100' : 'scale-100 opacity-0'} `}
      >
        <Button variant="text" onClick={handleClose} className="absolute right-2 top-2 border-none text-gray-400">
          <CloseOutlined />
        </Button>
        <Typography.Title level={4} className="m-0 text-blue-600">
          Receiver's Address
        </Typography.Title>
        <div>
          <Divider />
          <FormProvider {...method}>
            <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit(submitButtonClick)}>
              <AddressForm
                selectedDistrict={selectedDistrict}
                selectedProvince={selectedProvince}
                selectedWard={selectedWard}
                setSelectedDefault={setSelectedDefault}
                setSelectedDistrict={setSelectedDistrict}
                setSelectedProvince={setSelectedProvince}
                setSelectedWard={setSelectedWard}
                isDefault={isDefault}
              />
              <Flex justify="end" gap={'large'}>
                <Button size="large" onClick={handleClose}>
                  Cancel
                </Button>
                <Form.Item className="m-0">
                  <SubmitButton isSubmitting={isSubmitting} />
                </Form.Item>
              </Flex>
            </Form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
