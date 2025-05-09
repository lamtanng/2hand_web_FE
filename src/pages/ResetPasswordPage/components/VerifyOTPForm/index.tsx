import { FormProvider } from 'react-hook-form';
import useVerifyForm from './useVerifyOTPForm';
import { Button, Form } from 'antd';
import SubmitButton from '../../../../components/elements/Buttons/SubmitButton';
import CustomOTPInput from '../../../../components/elements/ControlledComponents/ControlledOTP';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { VerifyFormProps } from './VerifyOTP.constant';
import CountdownTimer from '../../../../components/elements/CountdownTimer';
import { useState } from 'react';

const VerifyOTPForm = ({
  hiddenVerify,
  account,
  handleBackOnClick,
  isCounting,
  setCounting,
  isSubmitting,
  setSubmitting,
}: VerifyFormProps) => {
  const [isDisable, setDisable] = useState<boolean>(true);
  const [hidden, setHidden] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isResent, setIsResent] = useState<boolean>(false);

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

  const { handleSubmit, method, handleVerify, handleResend } = useVerifyForm({
    account,
    handleResendClick,
    setSubmitting,
    setCounting,
    setIsResent,
    setDisable,
    setHidden,
    setIsDirty,
  });

  return (
    <div className="form-container w-8/12" hidden={hiddenVerify}>
      <Button
        type="text"
        className="p-0 hover:bg-transparent"
        onClick={() => {
          handleBackOnClick();
          setDisable(true);
          setHidden(false);
        }}
      >
        {' '}
        <ArrowLeftOutlined /> Back
      </Button>
      <p className="font-sans text-[46px] font-extrabold">Verify OTP</p>
      <p className="text-left font-sans text-base text-gray-600">
        We have sent an OTP for your account's verification process.
      </p>
      <FormProvider {...method}>
        <Form name="normal_login" layout="vertical" className="w-full" onFinish={handleSubmit(handleVerify)}>
          <Form.Item className="flex items-center justify-center">
            <CustomOTPInput setIsDirty={setIsDirty} isCounting={isCounting} />
          </Form.Item>
          <Form.Item>
            <SubmitButton isDirty={isDirty} isSubmitting={isSubmitting} />
          </Form.Item>
        </Form>
      </FormProvider>
      <Button
        type="default"
        size="large"
        className="w-full font-sans"
        loading={isResent}
        disabled={isDisable}
        onClick={handleResend}
      >
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
