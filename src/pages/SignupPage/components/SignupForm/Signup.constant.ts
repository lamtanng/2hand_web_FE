import * as yup from 'yup';
import { getRequiredMsg } from '../../../../utils/getMessage';

export interface SignupFormProps {
  hiddenSignup: boolean;
  handleSignupOnClick: (account: SignupProps) => void;
  isSubmitting: boolean;
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SignupProps {
  phoneNumber?: string
  password?: string;
  confirmPassword?: string;
}

export const signupSchema: yup.ObjectSchema<SignupProps> = yup.object({
  // email: yup.string().email().required(getRequiredMsg('Email')),
  phoneNumber: yup.string().length(10).required(),
  password: yup.string().required(getRequiredMsg('Password')),
  confirmPassword: yup
    .string()
    .required(getRequiredMsg('Confirm Password'))
    .oneOf([yup.ref('password')], 'Confirm password is not correct.'),
});
