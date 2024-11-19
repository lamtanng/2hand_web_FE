import { useEffect, useState } from 'react';
import { StoreProps } from '../../../../../types/store.type';
import { handleError } from '../../../../../utils/handleError';
import { orderAPIs } from '../../../../../apis/order.api';
import { GetAvailableServiceRequestProps } from '../../../../../types/http/order.type';
import { AddressProps } from '../../../../../types/address.type';
import { CartItemProps } from '../../../../../types/cart.type';

const useShipment = (
  store: StoreProps,
  address: AddressProps | undefined,
  product: CartItemProps[],
) => {
  const [service, setService] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const totalPrice = product
    .map((item: CartItemProps) => {
      return item.productID.price * item.quantity;
    })
    .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);

  const getAvailableService = async () => {
    try {
      const data: GetAvailableServiceRequestProps = {
        shop_id: Number(store.ghnStoreID),
        from_district: store.address[0].district?.DistrictID,
        to_district: address?.district?.DistrictID,
      };
      const res = await orderAPIs.getService(data);
      setService(res.data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    if (address) {
      getAvailableService();
    }
  }, []);

  useEffect(() => {
    if (address) {
      getAvailableService();
    }
  }, [address]);

  return {
    service,
    isModalOpen,
    setIsModalOpen,
    showModal,
    totalPrice,
  };
};
export default useShipment;
