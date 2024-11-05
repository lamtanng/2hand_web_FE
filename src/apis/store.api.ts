import { storePaths } from '../constants/apiPaths/storePaths';
import { axiosClient } from './axios';

const getStoreUrl = (url: string) => `${storePaths.storePath}/${url}`;
const userStoreUrl = getStoreUrl(storePaths.userPath);

const getStoreByUser = (userID: string | undefined) => {
    const url = `${userStoreUrl}/${userID}`;
    return axiosClient.get(url);
}

export const storeAPIs = { getStoreByUser };
