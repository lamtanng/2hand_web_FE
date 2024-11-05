import { useEffect, useState } from 'react';
import { handleError } from '../../../../../utils/handleError';
import { cartAPIs } from '../../../../../apis/cart.api';
import eventEmitter from '../../../../../utils/eventEmitter';

const useUserInfo = () => {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState<number>(0);
  const getUserCart = async () => {
    try {
      const res = await cartAPIs.getCart();
      const cartItemAmount = res.data
        .map((group: any) => {
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

    const deleteCartListener = eventEmitter.addListener('deleteProduct', getUserCart);
    const addToCartListener = eventEmitter.addListener('addToCart', getUserCart);
    return () => {
      deleteCartListener.remove();
      addToCartListener.remove();
    };
  }, []);

  return {
    getUserCart,
    cart,
    itemAmount,
  };
};

export default useUserInfo;
