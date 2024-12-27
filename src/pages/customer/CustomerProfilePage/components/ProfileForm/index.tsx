import { FormProvider } from 'react-hook-form';
import useProfileForm from './useProfileForm';
import { Button, DatePicker, Flex, Form, Typography } from 'antd';
import dayjs from 'dayjs';
import { UserProps } from '../../../../../types/user.type';
import CustomFormItem from '../../../../../components/elements/ControlledComponents/ControlledInput';
import SubmitButton from '../../../../../components/elements/Buttons/SubmitButton';

const ProfileForm = ({
  profile,
  setIsModalOpen,
  imgUrl,
  setImgUrl,
}: {
  profile: UserProps | undefined;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imgUrl: string | undefined;
  setImgUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const { handleSubmit, method, handleUpdateUser, onDateChange, dob, isSubmitting } = useProfileForm(
    profile,
    imgUrl,
    setImgUrl,
  );

  return (
    <FormProvider {...method}>
      <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit(handleUpdateUser)}>
        <Flex justify="space-between" gap={'large'}>
          <div className="w-1/2">
            <CustomFormItem name="firstName" hint="First name" label="First Name" isRequired={true} />
          </div>
          <div className="w-1/2">
            <CustomFormItem name="lastName" hint="Last name" label="Last Name" isRequired={true} />
          </div>
        </Flex>
        {/* <CustomFormItem name="email" hint="Email" label="Email" isRequired={true} isDisabled={true} /> */}
        <Flex align="center" gap={'large'}>
          <CustomFormItem name="phoneNumber" hint="Phone number" label="Phone Number" isDisabled={true} />
          <Button
            type="primary"
            className="mt-2 h-10"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Change
          </Button>
        </Flex>
        <Form.Item>
          <Typography.Paragraph className="m-0 mb-[10px]">
            Date of birth <span className="text-red-600">*</span>
          </Typography.Paragraph>
          <DatePicker value={dayjs(dob)} className="h-10 w-full text-base" allowClear={false} onChange={onDateChange} />
        </Form.Item>
        <Form.Item>
          <SubmitButton isSubmitting={isSubmitting} />
        </Form.Item>
      </Form>
    </FormProvider>
  );
};

export default ProfileForm;
