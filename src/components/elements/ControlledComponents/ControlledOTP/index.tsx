import { Form } from 'antd';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CustomOTPProps } from '../../../../types/input.type';
import { InputOTP } from 'antd-input-otp';

export default function CustomOTPInput({ setIsDirty }: CustomOTPProps) {
  const { control, watch } = useFormContext();
  const otpValue = watch('otp');

  useEffect(() => {
    if (otpValue.length !== 6 || otpValue.includes('')){
      setIsDirty(false);
    } else {
      setIsDirty(true);
    }
  }, [otpValue]);

  return (
    <Controller
      name="otp"
      control={control}
      render={({ field, fieldState }) => (
        <Form.Item validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message}>
          <InputOTP length={6} inputType='numeric' {...field} />
        </Form.Item>
      )}
    />
  );
}
