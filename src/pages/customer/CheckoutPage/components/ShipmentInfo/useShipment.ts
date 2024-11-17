import { useEffect, useState } from 'react';
import { StoreProps } from '../../../../../types/store.type';
import { handleError } from '../../../../../utils/handleError';
import { orderAPIs } from '../../../../../apis/order.api';
import { CalcShippingFeeRequestProps, GetAvailableServiceRequestProps } from '../../../../../types/http/order.type';
import { CartItemProps } from '../../../../../types/cart.type';
import { AddressProps } from '../../../../../types/address.type';

const useShipment = (store: StoreProps, address: AddressProps | undefined, products: CartItemProps[]) => {
  const [shippingFee, setShippingFee] = useState<any[]>([]);
  const [service, setService] = useState<any[]>([]);

  console.log('store:', store);
  console.log('address:', address);
  console.log('products:', products);

  const getAvailableService = async () => {
    try {
      const data: GetAvailableServiceRequestProps = {
        shop_id: Number(store.ghnStoreID),
        from_district: store.address[0].district?.DistrictID,
        to_district: address?.district?.DistrictID,
      };
      const res = await orderAPIs.getService(data);
      console.log(res.data);
      setService(res.data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  const calcShippingFeeByStore = async (service_type: number) => {
    try {
      const data: CalcShippingFeeRequestProps = {
        shopid: Number(store.ghnStoreID),
        weight: 500,
        service_type_id: service_type,
        from_district_id: store.address[0].district?.DistrictID,
        from_ward_code: store.address[0].ward?.WardCode,
        to_district_id: address?.district?.DistrictID,
        to_ward_code: address?.ward?.WardCode,
      };
      const res = await orderAPIs.calcShippingFee(data);
      console.log(res.data);
      setShippingFee([...shippingFee, res.data]);
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

  useEffect(() => {
    if (service.length !== 0) {
      //   service.forEach((element) => {
      //     calcShippingFeeByStore(element.service_type_id);
      //   });
      service
        .filter((element) => element.service_type_id === 2)
        .forEach((element) => {
          calcShippingFeeByStore(element.service_type_id);
        });
    }
  }, [service]);

  return {
    shippingFee,
  };
};
export default useShipment;
