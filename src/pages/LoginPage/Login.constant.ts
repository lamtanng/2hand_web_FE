import * as yup from 'yup';
import { getRequiredMsg } from '../../utils/getMessage';

interface LoginProps{
  email?: string,
  password?: string,
}

export const loginSchema: yup.ObjectSchema<LoginProps> = yup.object({
  email: yup.string().email().required(getRequiredMsg('Email')),
  password: yup.string().required(getRequiredMsg('Password')),
});
