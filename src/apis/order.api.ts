import { orderPaths } from '../constants/apiPaths/orderPaths';
import { CalcShippingFeeRequestProps, GetAvailableServiceRequestProps } from '../types/http/order.type';
import { axiosClient } from './axios';

const getOrderUrl = (url: string) => `${orderPaths.orderPath}/${url}`;
const orderUrl = getOrderUrl('');
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

const getOrder = (userID: string | undefined) => {
  return axiosClient.get(orderUrl, {
    params: {
      userID: userID,
    },
  });
};

const getSellerOrder = (storeID: string | undefined) => {
  const url = `${orderPaths.sellerPath}/${orderUrl}`
  return axiosClient.get(url, {
    params: {
      storeID: storeID
    },
  });
};
export const orderAPIs = { calcShippingFee, getService, placeOrder, getOrder, getSellerOrder };
