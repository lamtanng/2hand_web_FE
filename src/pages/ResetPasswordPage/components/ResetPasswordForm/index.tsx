import { Button, Form } from 'antd';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import CustomFormItem from '../../../../components/elements/ControlledComponents/ControlledInput';
import SubmitButton from '../../../../components/elements/Buttons/SubmitButton';
import useResetForm from './useResetForm';
import { SignupProps } from './ResetPassword.constant';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ResetPasswordForm = ({
  hiddenReset,
  handleSubmitOnClick,
  isSubmitting,
  setSubmitting,
}: {
  hiddenReset: boolean;
  handleSubmitOnClick: (account: SignupProps) => void;
  isSubmitting: boolean;
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { handleReset, handleSubmit, method } = useResetForm(handleSubmitOnClick, setSubmitting);
  const navigate = useNavigate();

  return (
    <>
      <div className="form-container w-8/12" hidden={hiddenReset}>
        <Button
          type="text"
          className="p-0 hover:bg-transparent"
          onClick={() => {
            navigate(-1);
          }}
        >
          {' '}
          <ArrowLeftOutlined /> Back
        </Button>
        <h2 className="font-sans">Reset Your Password</h2>
        <p className="text-left font-sans text-base text-gray-600"></p>
        <FormProvider {...method}>
          <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit(handleReset)}>
            <CustomFormItem hint="Phone number" name="phoneNumber" label="Phone Number" maxLength={10} />
            <CustomFormItem name="password" hint="Password" type="password" label="New Password" isRequired={true} />
            <CustomFormItem
              name="confirmPassword"
              hint="Confirm Password"
              type="password"
              label="Confirm Password"
              isRequired={true}
            />
            <Form.Item>
              <SubmitButton isSubmitting={isSubmitting} />
            </Form.Item>
          </Form>
        </FormProvider>
      </div>
    </>
  );
};

export default ResetPasswordForm;
