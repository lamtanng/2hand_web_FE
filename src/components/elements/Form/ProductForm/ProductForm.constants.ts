import * as yup from 'yup';

export interface FormProductProps {
  name?: string;
  description?: string;
  price?: number;
  weight?: number
}

export const productSchema: yup.ObjectSchema<FormProductProps> = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().min(0).required(),
  weight: yup.number().min(0).required(),
});
