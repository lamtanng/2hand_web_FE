import useAddressForm from './useAddressFrom';
import { FormProvider } from 'react-hook-form';
import { Button, Flex, Form } from 'antd';
import SubmitButton from '../../../../../../../../../components/elements/Buttons/SubmitButton';
import AddressForm from '../../../../../../../../../components/elements/Form/AddressForm';
import { AddressProps } from '../../../../../../../../../types/address.type';
import { UserProps } from '../../../../../../../../../types/user.type';

const ReceiverAddressForm = ({
  profile,
  address,
  hidden,
  setFormVisible,
  setRadioVisible,
  setEditedAddress,
}: {
  profile: UserProps | undefined;
  address: AddressProps | undefined;
  hidden: boolean;
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setRadioVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedAddress: React.Dispatch<React.SetStateAction<AddressProps | undefined>>;
}) => {
  const {
    handleSubmit,
    method,
    setSelectedDefault,
    setSelectedDistrict,
    setSelectedProvince,
    setSelectedWard,
    selectedDistrict,
    selectedProvince,
    selectedWard,
    isSubmitting,
    isDefault,
    submitButtonClick,
    reset,
  } = useAddressForm(address, profile, setFormVisible, setRadioVisible, setEditedAddress);

  return (
    <div hidden={hidden}>
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
            <Button
              size="large"
              onClick={() => {
                setFormVisible(true);
                setRadioVisible(false);
                setEditedAddress(undefined);
                setSelectedDistrict(null);
                setSelectedProvince(null);
                setSelectedWard(null);
                setSelectedDefault(false);
                reset({
                  detailAddress: '',
                });
              }}
            >
              Cancel
            </Button>
            <Form.Item className="m-0">
              <SubmitButton isSubmitting={isSubmitting} />
            </Form.Item>
          </Flex>
        </Form>
      </FormProvider>
    </div>
  );
};

export default ReceiverAddressForm;
