import { useState } from 'react';
import { CartItemProps } from '../../../../../types/cart.type';

const useShipment = (
  product: CartItemProps[],
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const totalPrice = product
    .map((item: CartItemProps) => {
      return item.productID.price * item.quantity;
    })
    .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);

  return {
    isModalOpen,
    setIsModalOpen,
    showModal,
    totalPrice,
  };
};
export default useShipment;
