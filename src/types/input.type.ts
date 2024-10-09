import { FormItemProps } from 'antd';
import { OTPProps } from 'antd/es/input/OTP';

export interface CustomFormItemProps extends FormItemProps {
  label?: string;
  name: string;
  hint: string;
  type?: string;
  isRequired?: boolean;
}

export interface CustomOTPProps extends OTPProps {
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  isCounting: boolean;
}
