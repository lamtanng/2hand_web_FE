import { orderRequestPaths } from '../constants/apiPaths/orderReasonPaths';
import { NewRequestProps, ReplyRequestProps } from '../types/http/orderRequest.type';
import { axiosClient } from './axios';

const getOrderRequestUrl = (url: string) => `${orderRequestPaths.orderRequestPath}/${url}`;
const orderRequestUrl = getOrderRequestUrl('');

const createNewRequest = (data: NewRequestProps) => {
  return axiosClient.post(orderRequestUrl, data);
};

const replyRequest = (data: ReplyRequestProps) => {
  return axiosClient.put(orderRequestUrl, data);
};

export const orderRequestsAPIs = {
  createNewRequest,
  replyRequest
};
