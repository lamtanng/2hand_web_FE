import * as yup from 'yup';

export interface AddressProps {
  name?: string;
  phoneNumber?: string;
  address?: string;
  ward?: string;
  district?: string;
  city?: string;
}

export const addressSchema: yup.ObjectSchema<AddressProps> = yup.object({
  name: yup.string(),
  phoneNumber: yup.string().length(10),
  address: yup.string(),
  ward: yup.string(),
  district: yup.string(),
  city: yup.string(),
});
