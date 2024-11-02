import * as yup from 'yup';

export interface StoreProps {
  name?: string;
  description?: string;
  address?: string;
}

export const storeSchema: yup.ObjectSchema<StoreProps> = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  address: yup.string().required(),
});
