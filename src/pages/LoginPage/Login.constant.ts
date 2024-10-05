import * as yup from 'yup';
import AccountProps from '../../types/account.type';
import { getRequiredMsg } from '../../utils/getMessage';

export const loginSchema: yup.ObjectSchema<AccountProps> = yup.object({
  email: yup.string().email().required(getRequiredMsg('Email')),
  password: yup.string().required(getRequiredMsg('Email')),
});
