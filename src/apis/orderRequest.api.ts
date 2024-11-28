import { orderRequestPaths } from '../constants/apiPaths/orderReasonPaths';
import { axiosClient } from './axios';

const getOrderRequestUrl = (url: string) => `${orderRequestPaths.orderRequestPath}/${url}`;
const orderRequestUrl = getOrderRequestUrl('');

const createNewRequest = (data: any) => {
  return axiosClient.post(orderRequestUrl, data);
};

export const orderRequestsAPIs = {
  createNewRequest,
};
