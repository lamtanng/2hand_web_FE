import { orderStagePaths } from '../constants/apiPaths/orderStagePaths';
import { axiosClient } from './axios';

const getOrderStageUrl = (url: string) => `${orderStagePaths.orderStagePath}/${url}`;
const orderStageUrl = getOrderStageUrl('');

const createOrderStage = (data: any) => {
  return axiosClient.post(orderStageUrl, data);
};

export const orderStageAPIs = {
  createOrderStage,
};
