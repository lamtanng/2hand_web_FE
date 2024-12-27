import * as yup from 'yup';
import { getRequiredMsg } from '../../utils/getMessage';

interface LoginProps {
  phoneNumber?: string;
  password?: string;
}

export const loginSchema: yup.ObjectSchema<LoginProps> = yup.object({
  // email: yup.string().email().required(getRequiredMsg('Email')),
  phoneNumber: yup.string().required().matches(/^[0-9]+$/, 'Phone number must contain only numbers').length(10),
  password: yup.string().required(getRequiredMsg('Password')),
});
