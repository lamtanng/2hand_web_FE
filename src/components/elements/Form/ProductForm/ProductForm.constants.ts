import * as yup from 'yup';

export interface FormProductProps {
  name?: string;
  price?: number;
  weight?: number;
  height?: number;
  width?: number;
  length?: number;
  detailAddress: string;
}

export const productSchema: yup.ObjectSchema<FormProductProps> = yup.object({
  name: yup.string().required(),
  price: yup.number().min(0).required(),
  weight: yup.number().min(0).integer().required(),
  height: yup.number().min(0).integer().required(),
  width: yup.number().min(0).integer().required(),
  length: yup.number().min(0).integer().required(),
  detailAddress: yup.string().required(),
});
