import { cartPaths } from '../constants/apiPaths/cartPaths';
import { DeleteCartItemProps, NewCartItemProps } from '../types/http/cart.type';
import { axiosClient } from './axios';

const getCartUrl = (url: string) => `${cartPaths.cartPath}/${url}`;
const userCartUrl = getCartUrl('');

const getCart = () => {
  return axiosClient.get(userCartUrl);
};

const getCartItem = (productID: string | undefined) => {
  const url = `${userCartUrl}/${productID}`;
  return axiosClient.get(url);
};

const addCartItem = (data: NewCartItemProps) => {
  return axiosClient.post(userCartUrl, data);
};

const deleteCartItem = (data: DeleteCartItemProps) => {
  return axiosClient.delete(userCartUrl, { data: data });
};

export const cartAPIs = { getCart, addCartItem, getCartItem, deleteCartItem };
