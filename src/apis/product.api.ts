import { productPaths } from '../constants/apiPaths/productPaths';
import { axiosClient } from './axios';

const getProductUrl = (url: string) => `${productPaths.productPath}/${url}`;
const productUrl = getProductUrl('');

const getAllProduct = (page: number, limit: number, search: string) => {
  return axiosClient.get(productUrl, {
    params: {
        page: page,
        limit: limit,
        search: search,
    }
  });
};

export const productAPIs = { getAllProduct };
