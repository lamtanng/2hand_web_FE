import * as yup from 'yup';

export interface FormProductProps {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  quality?: string;
}

export const productSchema: yup.ObjectSchema<FormProductProps> = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().min(0).required(),
  quantity: yup.number().min(1).required(),
  quality: yup.string().required()
});
