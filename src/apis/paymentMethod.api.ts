import { paymentMethodPaths } from '../constants/apiPaths/paymentMethodPaths';
import { axiosClient } from './axios';

const getPaymentMethodUrl = (url: string) => `${paymentMethodPaths.paymentMethodPath}/${url}`;
const paymentMethodUrl = getPaymentMethodUrl('');

const getAllMethod = () => {
  return axiosClient.get(paymentMethodUrl);
};

export const paymentMethodAPIs = {
  getAllMethod,
};
