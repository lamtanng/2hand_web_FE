import { productPaths } from '../constants/apiPaths/productPaths';
import { axiosClient } from './axios';

const getProductUrl = (url: string) => `${productPaths.productPath}/${url}`;
const productUrl = getProductUrl('');
const productBySlugUrl = getProductUrl(productPaths.slugPath);


const getAllProduct = (page: number, limit: number, search: string) => {
  return axiosClient.get(productUrl, {
    params: {
        page: page,
        limit: limit,
        search: search,
    }
  });
};

const getProductBySlug = (slug: string | undefined) => {
  const url = `${productBySlugUrl}/${slug}`
  return axiosClient.get(url);
};

export const productAPIs = { getAllProduct, getProductBySlug };
