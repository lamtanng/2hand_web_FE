import useAddressForm from './useAddressFrom';
import { FormProvider } from 'react-hook-form';
import { Button, Divider, Flex, Form } from 'antd';
import SubmitButton from '../../../../../../../../../components/elements/Buttons/SubmitButton';
import AddressForm from '../../../../../../../../../components/elements/Form/AddressForm';

const ReceiverAddressForm = ({
  hidden,
  setFormVisible,
  setRadioVisible,
}: {
  hidden: boolean;
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setRadioVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    handleSubmit,
    method,
    handleAddAddress,
    setDefault,
    setSelectedDistrict,
    setSelectedProvince,
    setSelectedWard,
    selectedDistrict,
    selectedProvince,
    selectedWard,
    isSubmitting,
    isDefault
  } = useAddressForm();

  return (
    <div hidden={hidden}>
      <Divider />
      <FormProvider {...method}>
        <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit(handleAddAddress)}>
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
          <Flex justify="end" gap={'large'}>
            <Button
              size="large"
              onClick={() => {
                setFormVisible(true);
                setRadioVisible(false);
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
