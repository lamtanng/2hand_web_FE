import { FormProvider } from 'react-hook-form';
import useProfileForm from './useProfileForm';
import { Flex, Form } from 'antd';
import CustomFormItem from '../../../../../../components/elements/ControlledComponents/ControlledInput';
import SubmitButton from '../../../../../../components/elements/Buttons/SubmitButton';
import CustomDatePicker from '../../../../../../components/elements/ControlledComponents/ControlledDatePicker';

const ProfileForm = () => {
  const { handleSubmit, method } = useProfileForm();

  return (
    <FormProvider {...method}>
      <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit}>
        <Flex justify="space-between" gap={'large'}>
          <div className="w-1/2">
            <CustomFormItem name="firstName" hint="First name" label="First Name" isRequired={true} />
          </div>
          <div className="w-1/2">
            <CustomFormItem name="lastName" hint="Last name" label="Last Name" isRequired={true} />
          </div>
        </Flex>
        <CustomFormItem name="email" hint="Email" label="Email" isRequired={true} isDisabled={true} />
        <CustomFormItem name="phoneNumber" hint="Phone number" label="Phone Number" isRequired={true} />
        <CustomDatePicker name="birthday" label="Birthday" />
        <Form.Item>
          <SubmitButton />
        </Form.Item>
      </Form>
    </FormProvider>
  );
};

export default ProfileForm;
