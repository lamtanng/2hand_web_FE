import * as yup from 'yup';
import { getRequiredMsg } from '../../../../utils/getMessage';
import { UserProps } from '../../../../types/user.type';

export interface VerifyFormProps {
  hiddenVerify: boolean;
  account: UserProps;
  handleBackOnClick: () => void;
  isCounting: boolean;
  setCounting: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface useVerifyFormProps{
  account: UserProps,
  handleResendClick: () => void,
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  setCounting: React.Dispatch<React.SetStateAction<boolean>>,
  setIsResent: React.Dispatch<React.SetStateAction<boolean>>,
  setDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setHidden: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>,
}

export interface VerifyProps {
  otp?: number[];
}

export const verifySchema: yup.ObjectSchema<VerifyProps> = yup.object({
  otp: yup.array().required(getRequiredMsg('OTP')),
});
