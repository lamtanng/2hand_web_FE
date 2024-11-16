import * as yup from 'yup';

export interface FormPhoneNumberProps {
  phoneNumber?: string;
}

export const phoneNumberSchema: yup.ObjectSchema<FormPhoneNumberProps> = yup.object({
  phoneNumber: yup.string().length(10).required(),
});