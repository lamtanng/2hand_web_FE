
import { userPaths } from '../constants/apiPaths/userPaths';
import { axiosClient } from './axios';

const getUserUrl = (url: string) => `${userPaths.userPath}/${url}`;
const userUrl = getUserUrl('');

const getUserByUserID = (userID: string | undefined) => {
    const url = `${userUrl}/${userID}`;
    return axiosClient.get(url);
}

const updateUser = (data: any) => {
    return axiosClient.put(userUrl, data);
}

export const userAPIs = { getUserByUserID, updateUser };