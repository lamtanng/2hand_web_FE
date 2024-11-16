import { Button, Flex, Form } from 'antd';
import { FormProvider } from 'react-hook-form';
import usePhoneForm from './usePhoneForm';
import CustomFormItem from '../../../../../../../components/elements/ControlledComponents/ControlledInput';
import SubmitButton from '../../../../../../../components/elements/Buttons/SubmitButton';

const PhoneForm = ({
  setIsModalOpen,
  hiddenPhone,
  handleCreatePhone
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hiddenPhone: boolean,
  handleCreatePhone: (phoneNumber: string | undefined) => void
}) => {
  const { handleClose, handleSubmit, method, isSubmitting, handleAddPhone } = usePhoneForm(setIsModalOpen, handleCreatePhone);

  return (
    <div hidden={hiddenPhone}>
      <FormProvider {...method}>
        <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit(handleAddPhone)}>
          <CustomFormItem hint="Phone number" name="phoneNumber" label="Phone Number" />
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
  );
};

export default PhoneForm;
