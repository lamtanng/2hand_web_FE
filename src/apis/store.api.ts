import { storePaths } from '../constants/apiPaths/storePaths';
import { NewStoreProps, UpdateStoreRequestProps } from '../types/http/store.type';
import { axiosClient } from './axios';

const getStoreUrl = (url: string) => `${storePaths.storePath}/${url}`;
const storeUrl = getStoreUrl('');
const userStoreUrl = getStoreUrl(storePaths.userPath);
const storeStatisticsUrl = getStoreUrl(storePaths.statisticsPath);

const getStoreByUser = (userID: string | undefined) => {
  const url = `${userStoreUrl}/${userID}`;
  return axiosClient.get(url);
};

const addStore = (data: NewStoreProps) => {
  return axiosClient.post(storeUrl, data);
};

const updateStore = (data: UpdateStoreRequestProps) => {
  return axiosClient.patch(storeUrl, data);
};

const getStoreStatistics = (storeID: string | undefined) => {
  return axiosClient.get(storeStatisticsUrl, {
    params: {
      storeID: storeID,
    },
  });
};

export const storeAPIs = { getStoreByUser, addStore, updateStore, getStoreStatistics };
