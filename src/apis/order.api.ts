import { orderPaths } from '../constants/apiPaths/orderPaths';
import { CalcShippingFeeRequestProps, GetAvailableServiceRequestProps } from '../types/http/order.type';
import { axiosClient } from './axios';

const getOrderUrl = (url: string) => `${orderPaths.orderPath}/${url}`;
const calcShippingFeeUrl = getOrderUrl(orderPaths.calcShippingFeePath);
const getServiceUrl = getOrderUrl(orderPaths.getServicePath);
const placeOrderUrl = getOrderUrl(orderPaths.placeOrderPath);

const calcShippingFee = (data: CalcShippingFeeRequestProps) => {
  return axiosClient.post(calcShippingFeeUrl, data);
};

const getService = (data: GetAvailableServiceRequestProps) => {
    return axiosClient.post(getServiceUrl, data);
  };

  const placeOrder = (data: any) => {
    return axiosClient.post(placeOrderUrl, data);
  };
export const orderAPIs = { calcShippingFee, getService, placeOrder };
