import { productPaths } from '../constants/apiPaths/productPaths';
import { axiosClient } from './axios';

const getProductUrl = (url: string) => `${productPaths.productPath}/${url}`;
const productUrl = getProductUrl('');
const productBySlugUrl = getProductUrl(productPaths.slugPath);

const getAllProduct = (
  page: number,
  limit: number,
  search: string,
  sort: { price?: number; createAt?: number },
  quality: string,
  price: { min?: number; max?: number },
  cateID: string[],
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
    },
  });
};

const getProductBySlug = (slug: string | undefined) => {
  const url = `${productBySlugUrl}/${slug}`;
  return axiosClient.get(url);
};

export const productAPIs = { getAllProduct, getProductBySlug };
