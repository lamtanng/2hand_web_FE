import { useEffect, useState } from 'react';
import { handleError } from '../../../../../utils/handleError';
import { cartAPIs } from '../../../../../apis/cart.api';
import eventEmitter from '../../../../../utils/eventEmitter';
import { userAPIs } from '../../../../../apis/user.api';
import { UserProps } from '../../../../../types/user.type';
import { CartProps } from '../../../../../types/cart.type';

const useUserInfo = (user: UserProps) => {
  const [cart, setCart] = useState([]);
  const [profile, setProfile] = useState<UserProps>();
  const [itemAmount, setItemAmount] = useState<number>(0);

  const getUserByID = async (userID: string | undefined) => {
    try {
      const res = await userAPIs.getUserByUserID(userID);
      setProfile(res.data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  const getUserCart = async () => {
    try {
      const res = await cartAPIs.getCart();
      const cartItemAmount = res.data
        .map((group: CartProps) => {
          return group.products;
        })
        .flat().length;
      setCart(res.data);
      setItemAmount(cartItemAmount);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    getUserCart();
    getUserByID(user._id);

    const deleteCartListener = eventEmitter.addListener('deleteProduct', getUserCart);
    const addToCartListener = eventEmitter.addListener('addToCart', getUserCart);
    const updateProfileListener = eventEmitter.addListener('updateProfile', (userID: string) => {
      getUserByID(userID);
    });
    return () => {
      deleteCartListener.remove();
      addToCartListener.remove();
      updateProfileListener.remove();
    };
  }, []);
  return {
    getUserCart,
    cart,
    itemAmount,
    profile,
  };
};

export default useUserInfo;
