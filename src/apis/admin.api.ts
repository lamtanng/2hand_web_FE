import { adminPaths } from '../constants/apiPaths/adminPaths';
import { orderPaths } from '../constants/apiPaths/orderPaths';
import { axiosClient } from './axios';

const getAdminUrl = (url: string) => `${adminPaths.adminPath}/${url}`;
const dashboardUrl = getAdminUrl(adminPaths.dashboardPath);
const orderUrl = getAdminUrl(orderPaths.orderPath);

const accessDashboard = () => {
  return axiosClient.get(dashboardUrl);
};

const getAllOrders = (limit: number | undefined) => {
  return axiosClient.get(orderUrl, {
    params: {
      limit: limit,
    },
  });
};

export const adminAPIs = { accessDashboard, getAllOrders };
