import { useCallback, useEffect, useState } from 'react';
import { orderAPIs } from '../../../../../../../apis/order.api';
import { AddressProps } from '../../../../../../../types/address.type';
import { CartItemProps } from '../../../../../../../types/cart.type';
import { CalcShippingFeeRequestProps } from '../../../../../../../types/http/order.type';
import { StoreProps } from '../../../../../../../types/store.type';
import { handleError } from '../../../../../../../utils/handleError';

const useShipmentModal = (
  store: StoreProps,
  address: AddressProps | undefined,
  products: CartItemProps[],
  service: any[],
  setSelectedShipment: React.Dispatch<any>,
) => {
  const [shipment, setShipment] = useState<any[]>([]);

  const calcShippingFeeByStore = useCallback(
    async (service_type: number) => {
      try {
        const data: CalcShippingFeeRequestProps = {
          shopid: Number(store.ghnStoreID),
          weight: 500,
          service_type_id: service_type,
          from_district_id: store.address[0].district?.DistrictID,
          from_ward_code: store.address[0].ward?.WardCode,
          to_district_id: address?.district?.DistrictID,
          to_ward_code: address?.ward?.WardCode,
          items: products.map((item: CartItemProps) => ({
            name: item.productID.name,
            quantity: item.quantity,
            weight: item.productID.weight,
            height: item.productID.height,
            length: item.productID.length,
            width: item.productID.width,
          })),
        };

        const res = await orderAPIs.calcShippingFee(data);

        return {
          service_type_id: service_type,
          total: res.data.total,
        };
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [store, address, products],
  );

  const fetchAllShipmentFees = useCallback(async () => {
    if (service.length === 0) return;
    try {
      // Use Promise.all to fetch all shipping fees concurrently
      const results = await Promise.all(service.map((item) => calcShippingFeeByStore(item.service_type_id)));

      // Update state with all fetched shipment fees
      setShipment(results);
    } catch (error) {
      handleError(error);
    } finally {
    }
  }, [service, calcShippingFeeByStore]);

  // Trigger shipment fee calculation when service changes
  useEffect(() => {
    fetchAllShipmentFees();
  }, [fetchAllShipmentFees]);

  useEffect(() => {
    if (shipment.length !== 0) {
      setSelectedShipment(shipment[0]);
    }
  }, [shipment]);

  return {
    shipment,
  };
};
export default useShipmentModal;
