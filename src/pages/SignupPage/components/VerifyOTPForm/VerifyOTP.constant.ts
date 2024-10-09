import * as yup from 'yup';
import { getRequiredMsg } from '../../../../utils/getMessage';
import { UserProps } from '../../../../types/user.type';

export interface VerifyFormProps {
  hiddenVerify: boolean;
  account: UserProps;
  handleBackOnClick: () => void;
  isCounting: boolean;
  setCounting: React.Dispatch<React.SetStateAction<boolean>>;
}

interface VerifyProps {
  otp?: string;
}

export const verifySchema: yup.ObjectSchema<VerifyProps> = yup.object({
  otp: yup.string().required(getRequiredMsg('OTP')),
});
