import { storePaths } from '../constants/apiPaths/storePaths';
import { NewStoreProps } from '../types/http/store.type';
import { axiosClient } from './axios';

const getStoreUrl = (url: string) => `${storePaths.storePath}/${url}`;
const storeUrl = getStoreUrl('');
const userStoreUrl = getStoreUrl(storePaths.userPath);

const getStoreByUser = (userID: string | undefined) => {
    const url = `${userStoreUrl}/${userID}`;
    return axiosClient.get(url);
}

const addStore = (data: NewStoreProps) => {
    return axiosClient.post(storeUrl, data);
}

const updateStore = (data: any) => {
    return axiosClient.post(storeUrl, data);
}

export const storeAPIs = { getStoreByUser, addStore, updateStore };
