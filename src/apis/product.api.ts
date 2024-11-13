import { productPaths } from '../constants/apiPaths/productPaths';
import { ProductRequestBodyProps } from '../types/http/product.type';
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

const addProduct = (data: ProductRequestBodyProps) => {
  return axiosClient.post(productUrl, data);
};

export const productAPIs = { getAllProduct, getProductBySlug, addProduct };
