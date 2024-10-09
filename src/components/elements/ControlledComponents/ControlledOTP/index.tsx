import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CustomOTPProps } from '../../../../types/input.type';

export default function CustomOTPInput({ setIsDirty }: CustomOTPProps) {
  const { control, watch } = useFormContext();
  const otpValue = watch('otp');

  useEffect(() => {
    if (otpValue && otpValue.length === 6) {
      // You can perform any action here with the complete OTP value
      setIsDirty(true);
    }
  }, [otpValue]);
  return (
    <Controller
      name="otp"
      control={control}
      render={({ field, fieldState }) => (
        <Form.Item validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message}>
          <Input.OTP size="large" length={6} {...field} />
        </Form.Item>
      )}
    />
  );
}
