import { orderStagePaths } from '../constants/apiPaths/orderStagePaths';
import { NewOrderStage } from '../types/http/orderStage.type';
import { axiosClient } from './axios';

const getOrderStageUrl = (url: string) => `${orderStagePaths.orderStagePath}/${url}`;
const orderStageUrl = getOrderStageUrl('');

const createOrderStage = (data: NewOrderStage) => {
  return axiosClient.post(orderStageUrl, data);
};

export const orderStageAPIs = {
  createOrderStage,
};
