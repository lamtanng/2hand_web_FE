import axios from 'axios';
import { productPaths } from '../constants/apiPaths/productPaths';
import { ProductRequestBodyProps } from '../types/http/product.type';
import { axiosClient } from './axios';
import { headers, withCredentials } from './axios.constants';
import { AI_CONFIG } from '../config/environment';

const baseURL = AI_CONFIG.baseURL;
const API_KEY = AI_CONFIG.API_KEY;

const axiosAI = axios.create({ baseURL, headers, withCredentials });

const getProductUrl = (url: string) => `${productPaths.productPath}/${url}`;
const productUrl = getProductUrl('');
const productBySlugUrl = getProductUrl(productPaths.slugPath);
const productByIDUrl = getProductUrl(productPaths.idPath);

const getAllProduct = (
  page: number,
  limit: number,
  search: string | null,
  sort: string | null,
  quality: string | null,
  price: string | null,
  cateID: string | null,
  storeID: string | undefined,
) => {
  return axiosClient.get(productUrl, {
    params: {
      page: page,
      limit: limit,
      search: search,
      sort: sort,
      quality: quality,
      price: price,
      cateID: cateID,
      storeID: storeID,
    },
  });
};

const getProductBySlug = (slug: string | undefined) => {
  const url = `${productBySlugUrl}/${slug}`;
  return axiosClient.get(url);
};

const getProductByID = (productID: string | undefined) => {
  const url = `${productByIDUrl}/${productID}`;
  return axiosClient.get(url);
};

const addProduct = (data: ProductRequestBodyProps) => {
  return axiosClient.post(productUrl, data);
};

const updateProduct = (data: ProductRequestBodyProps) => {
  return axiosClient.put(productUrl, data);
};

const deleteProduct = (productID: string) => {
  return axiosClient.delete(productUrl, { params: { _id: productID } });
};

const integrateAI = (content: any) => {
  const generateURL = 'v1/chat/completions';
  return axiosAI.post(generateURL, content, {
    headers: {
      Authorization: API_KEY,
    },
    withCredentials: false
  });
};

export const productAPIs = {
  getAllProduct,
  getProductBySlug,
  addProduct,
  deleteProduct,
  getProductByID,
  updateProduct,
  integrateAI,
};
