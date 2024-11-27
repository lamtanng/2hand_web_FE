import { useState } from 'react';
import { orderAPIs } from '../../../../../apis/order.api';
import { handleError } from '../../../../../utils/handleError';
import { CalcExpectedDeliveryDateRequest } from '../../../../../types/http/order.type';
import { OrderProps } from '../../../../../types/order.type';

const useOrderItem = (order: OrderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickupDates, setPickupDates] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);

  const pickingOrder = async () => {
    try {
      const res = await orderAPIs.getPickupDate();
      setPickupDates(res.data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsModalOpen(true);
    }
  };

  const deliveringOrder = async () => {
    try {
      setLoading(true);
      const data: CalcExpectedDeliveryDateRequest = {
        ShopID: Number(order.storeID.ghnStoreID),
        from_district_id: order?.storeID?.address[0]?.district?.DistrictID,
        from_ward_code: order?.storeID?.address[0]?.ward?.WardCode,
        to_district_id: order?.receiverAddress?.district?.DistrictID,
        to_ward_code: order?.receiverAddress?.ward?.WardCode,
      };
      const res = await orderAPIs.calcExpectedDeliveryDate(data);
      console.log(res.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    isModalOpen,
    setIsModalOpen,
    pickingOrder,
    pickupDates,
    deliveringOrder,
    isLoading
  };
};
export default useOrderItem;
