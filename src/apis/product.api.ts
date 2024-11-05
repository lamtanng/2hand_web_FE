import { productPaths } from '../constants/apiPaths/productPaths';
import { axiosClient } from './axios';

const getProductUrl = (url: string) => `${productPaths.productPath}/${url}`;
const productUrl = getProductUrl('');
const productBySlugUrl = getProductUrl(productPaths.slugPath);

const getAllProduct = (
  page: number,
  limit: number,
  search: string | undefined,
  sort: string | undefined,
  quality: string | undefined,
  price: string | undefined,
  cateID: string | undefined,
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
