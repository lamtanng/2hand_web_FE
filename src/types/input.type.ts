import { DatePickerProps, FormItemProps, RadioGroupProps } from 'antd';
import { OTPProps } from 'antd/es/input/OTP';

export interface CustomFormItemProps extends FormItemProps {
  label?: string;
  name: string;
  hint: string;
  type?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}

export interface CustomOTPProps extends OTPProps {
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  isCounting: boolean;
}

export interface CustomDatePickerProps extends DatePickerProps {
  name: string;
  label: string;
}

export interface CustomRadioProps extends RadioGroupProps {
  name: string;
  label: string;
  items: { value: string; name: string; }[],
}