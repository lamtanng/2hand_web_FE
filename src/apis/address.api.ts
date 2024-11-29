import { addressPaths } from '../constants/apiPaths/addressPaths';
import { userPaths } from '../constants/apiPaths/userPaths';
import { axiosClient } from './axios';

const baseURL = 'https://dev-online-gateway.ghn.vn/shiip/public-api';
const getProvinceUrl = `${baseURL}/master-data/province`;
const getDistrictUrl = `${baseURL}/master-data/district`;
const getWardUrl = `${baseURL}/master-data/ward`;
// axiosClient.defaults.headers.common['Token'] = 'ed46e816-9b63-11ef-8e53-0a00184fe694';

const getAddressUrl = (url: string) => `${userPaths.userPath}/${addressPaths.addressPath}/${url}`;
const provinceUrl = getAddressUrl(addressPaths.provincePath);
const districtUrl = getAddressUrl(addressPaths.districtPath);
const wardUrl = getAddressUrl(addressPaths.wardPath);

const getProvinces = () => {
  return axiosClient.get(provinceUrl, );
};

const getDistricts = (province_id: number | undefined) => {
  return axiosClient.get(districtUrl, {
    params: {
      province_id: province_id,
    },
  });
};

const getWards = (district_id: number | undefined) => {
  return axiosClient.get(wardUrl, {
    params: {
      district_id: district_id,
    },
  });
};

export const addressAPIs = { getProvinces, getDistricts, getWards };
