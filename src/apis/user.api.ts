import { addressPaths } from '../constants/apiPaths/addressPaths';
import { userPaths } from '../constants/apiPaths/userPaths';
import { AddressRequestProps } from '../types/http/address.type';
import { UserProps } from '../types/user.type';
import { axiosClient } from './axios';

const getUserUrl = (url: string) => `${userPaths.userPath}/${url}`;
const userUrl = getUserUrl('');
const addressUrl = getUserUrl(addressPaths.addressPath);
const sendOTPUrl = getUserUrl(userPaths.sendOTPPath);
const verifyUrl = getUserUrl(userPaths.verifyPath);

const getAllUsers = () => {
  return axiosClient.get(userUrl);
};

const getUserByUserID = (userID: string | undefined) => {
  const url = `${userUrl}${userID}`;
  return axiosClient.get(url);
};

const getUserByUserSlug = (slug: string | undefined) => {
  return axiosClient.get(userUrl, {
    params: {
      slug: slug,
    },
  });
};

const updateUser = (data: UserProps) => {
  return axiosClient.put(userUrl, data);
};

const createAddress = (data: AddressRequestProps) => {
  return axiosClient.post(addressUrl, data);
};

const updateAddress = (data: AddressRequestProps) => {
  return axiosClient.put(addressUrl, data);
};

const deleteAddress = (data: any) => {
  return axiosClient.delete(addressUrl, { data: data });
};

const sendPhoneOTP = (data: any) => {
  return axiosClient.post(sendOTPUrl, data);
};

const verifyPhoneNumber = (data: any) => {
  return axiosClient.post(verifyUrl, data);
};

export const userAPIs = {
  getAllUsers,
  getUserByUserID,
  getUserByUserSlug,
  updateUser,
  updateAddress,
  createAddress,
  deleteAddress,
  sendPhoneOTP,
  verifyPhoneNumber,
};
