import * as yup from 'yup';

export interface FormAddressProps {
  detailAddress?: string;
}

export const addressSchema: yup.ObjectSchema<FormAddressProps> = yup.object({
  detailAddress: yup.string().required(),
});