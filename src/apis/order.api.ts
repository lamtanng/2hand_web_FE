import { orderPaths } from '../constants/apiPaths/orderPaths';
import {
  CalcExpectedDeliveryDateRequest,
  CalcShippingFeeRequestProps,
  CreateCODPaymentRequestProps,
  GetAvailableServiceRequestProps,
} from '../types/http/order.type';
import { axiosClient } from './axios';

const getOrderUrl = (url: string) => `${orderPaths.orderPath}/${url}`;
const orderUrl = getOrderUrl('');
const calcShippingFeeUrl = getOrderUrl(orderPaths.calcShippingFeePath);
const getServiceUrl = getOrderUrl(orderPaths.getServicePath);
const placeOrderUrl = getOrderUrl(orderPaths.placeOrderPath);
const getPickupDateUrl = getOrderUrl(orderPaths.getPickupDatePath);
const calcExpectedDeliveryDateUrl = getOrderUrl(orderPaths.calcExpectedDeliveryDatePath);

const calcShippingFee = (data: CalcShippingFeeRequestProps) => {
  return axiosClient.post(calcShippingFeeUrl, data);
};

const getService = (data: GetAvailableServiceRequestProps) => {
  return axiosClient.post(getServiceUrl, data);
};

const placeOrder = (data: CreateCODPaymentRequestProps) => {
  return axiosClient.post(placeOrderUrl, data);
};

const getOrder = (userID: string | undefined, stages: string | undefined, page: number) => {
  return axiosClient.get(orderUrl, {
    params: {
      userID: userID,
      stages: stages,
      page: page,
    },
  });
};

const getSellerOrder = (storeID: string | undefined, stages: string | undefined, page: number) => {
  const url = `${orderPaths.sellerPath}/${orderUrl}`;
  return axiosClient.get(url, {
    params: {
      storeID: storeID,
      stages: stages,
      page: page,
    },
  });
};

const getPickupDate = () => {
  return axiosClient.post(getPickupDateUrl);
};

const calcExpectedDeliveryDate = (data: CalcExpectedDeliveryDateRequest) => {
  return axiosClient.post(calcExpectedDeliveryDateUrl, data);
};

const getOrderByID = (orderID: string | undefined) => {
  return axiosClient.get(`${orderUrl}${orderID}`);
};

export const orderAPIs = {
  calcShippingFee,
  getService,
  placeOrder,
  getOrder,
  getSellerOrder,
  getPickupDate,
  calcExpectedDeliveryDate,
  getOrderByID,
};
