import * as yup from 'yup';

export interface FormStoreProps {
  name?: string;
  phoneNumber?: string,
  detailAddress?: string;
}

export const storeSchema: yup.ObjectSchema<FormStoreProps> = yup.object({
  name: yup.string().required(),
  phoneNumber: yup.string().required(),
  detailAddress: yup.string().required(),
});
