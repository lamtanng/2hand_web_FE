import { adminPaths } from '../constants/apiPaths/adminPaths';
import { axiosClient } from './axios';

const getAdminUrl = (url: string) => `${adminPaths.adminPath}/${url}`;
const dashboardUrl = getAdminUrl(adminPaths.dashboardPath);

const accessDashboard = () => {
  return axiosClient.get(dashboardUrl);
};

export const adminAPIs = { accessDashboard };
