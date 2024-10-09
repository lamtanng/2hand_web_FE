import * as yup from 'yup';
import { getRequiredMsg } from '../../../../utils/getMessage';
import { UserProps } from '../../../../types/user.type';

export interface SignupFormProps {
  hiddenSignup: boolean;
  handleSignupOnClick: (account: UserProps) => void;
}

interface SignupProps {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const signupSchema: yup.ObjectSchema<SignupProps> = yup.object({
  email: yup.string().email().required(getRequiredMsg('Email')),
  password: yup.string().required(getRequiredMsg('Password')),
  confirmPassword: yup
    .string()
    .required(getRequiredMsg('Confirm Password'))
    .oneOf([yup.ref('password')], 'Confirm password is not correct.'),
});
