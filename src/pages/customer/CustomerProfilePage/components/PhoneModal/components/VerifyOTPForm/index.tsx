import { FormProvider } from 'react-hook-form';
import useVerifyForm from './useVerifyOTPForm';
import { Button, Form } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { UserProps } from '../../../../../../../types/user.type';
import CustomOTPInput from '../../../../../../../components/elements/ControlledComponents/ControlledOTP';
import SubmitButton from '../../../../../../../components/elements/Buttons/SubmitButton';
import CountdownTimer from '../../../../../../../components/elements/CountdownTimer';

const VerifyOTPForm = ({
  hiddenVerify,
  handleBackOnClick,
  isCounting,
  setCounting,
  phoneNumber,
  profile,
}: {
  hiddenVerify: boolean;
  handleBackOnClick: () => void;
  isCounting: boolean;
  setCounting: React.Dispatch<React.SetStateAction<boolean>>;
  phoneNumber: string | undefined;
  profile: UserProps | undefined;
}) => {
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isDisable, setDisable] = useState<boolean>(true);
  const [hidden, setHidden] = useState<boolean>(false);

  const handleCountdown = () => {
    setDisable(false);
    setHidden(true);
    setIsDirty(false);
  };

  const handleResendClick = () => {
    setDisable(true);
    setHidden(false);
    setCounting(true);
  };

  const handleVerifyError = () => {
    setCounting(false);
    setDisable(false);
    setHidden(true);
    setIsDirty(false);
  };

  const { method, handleSubmit, reset, isSubmitting, handleVerify, handleResend } = useVerifyForm(
    phoneNumber,
    profile,
    handleResendClick,
    handleVerifyError
  );

  return (
    <div className="form-container" hidden={hiddenVerify}>
      <Button
        type="text"
        className="p-0 hover:bg-transparent"
        onClick={() => {
          reset();
          handleBackOnClick();
        }}
      >
        {' '}
        <ArrowLeftOutlined /> Back
      </Button>
      <p className="my-6 text-center font-sans text-4xl font-extrabold">Verify OTP</p>
      <p className="text-center font-sans text-base text-gray-600">
        We have sent an OTP for your phone number's verification process.
      </p>
      <FormProvider {...method}>
        <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit(handleVerify)}>
          <Form.Item className="flex items-center justify-center">
            <CustomOTPInput setIsDirty={setIsDirty} isCounting={true} />
          </Form.Item>
          <Form.Item>
            <SubmitButton isDirty={isDirty} isSubmitting={isSubmitting} />
          </Form.Item>
        </Form>
      </FormProvider>
      <Button type="default" size="large" className="w-full font-sans" disabled={isDisable} onClick={handleResend}>
        Resend OTP{' '}
        <CountdownTimer
          seconds={120}
          setDisable={handleCountdown}
          isCounting={isCounting}
          hidden={hidden}
          setCounting={setCounting}
        />
      </Button>
    </div>
  );
};

export default VerifyOTPForm;
