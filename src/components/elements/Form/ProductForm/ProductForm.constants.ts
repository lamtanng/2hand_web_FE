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
  weight: yup.number().min(0).required(),
  height: yup.number().min(0).required(),
  width: yup.number().min(0).required(),
  length: yup.number().min(0).required(),
  detailAddress: yup.string().required(),
});
