import { adminPaths } from '../constants/apiPaths/adminPaths';
import { orderPaths } from '../constants/apiPaths/orderPaths';
import { userPaths } from '../constants/apiPaths/userPaths';
import { axiosClient } from './axios';

const getAdminUrl = (url: string) => `${adminPaths.adminPath}/${url}`;
const dashboardUrl = getAdminUrl(adminPaths.dashboardPath);
const orderUrl = getAdminUrl(orderPaths.orderPath);
const accountUrl = getAdminUrl(userPaths.userPath);
const adminStatisticsUrl = getAdminUrl(adminPaths.statisticsPath);

const accessDashboard = () => {
  return axiosClient.get(dashboardUrl);
};

const getAllOrders = (limit: number | undefined) => {
  return axiosClient.get(orderUrl, {
    params: {
      limit: limit,
      sort: JSON.stringify({ updatedAt: -1 }),
    },
  });
};

const getAdminStatistics = () => {
  return axiosClient.get(adminStatisticsUrl);
};

const getUsers = () => {
  return axiosClient.get(accountUrl, {
    params: {
      limit: 100,
    },
  });
};

export const adminAPIs = { accessDashboard, getAllOrders, getAdminStatistics, getUsers };
