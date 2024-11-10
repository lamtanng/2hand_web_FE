
import { addressPaths } from '../constants/apiPaths/addressPaths';
import { userPaths } from '../constants/apiPaths/userPaths';
import { AddressProps } from '../types/address.type';
import { UserProps } from '../types/user.type';
import { axiosClient } from './axios';

const getUserUrl = (url: string) => `${userPaths.userPath}/${url}`;
const userUrl = getUserUrl('');
const addressUrl = getUserUrl(addressPaths.addressPath);

const getUserByUserID = (userID: string | undefined) => {
    const url = `${userUrl}/${userID}`;
    return axiosClient.get(url);
}

const updateUser = (data: UserProps) => {
    return axiosClient.put(userUrl, data);
}

const createAddress = (data: AddressProps) => {
    return axiosClient.post(addressUrl, data);
}

const updateAddress = (data: AddressProps) => {
    return axiosClient.put(addressUrl, data);
}

export const userAPIs = { getUserByUserID, updateUser, updateAddress, createAddress };