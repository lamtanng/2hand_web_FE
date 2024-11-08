import * as yup from 'yup';

export interface StoreProps {
  name?: string;
  description?: string;
  phoneNumber?: string,
  detailAddress?: string;
}

export const storeSchema: yup.ObjectSchema<StoreProps> = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  phoneNumber: yup.string().length(10).required().default("0000000000"),
  detailAddress: yup.string().required(),
});
