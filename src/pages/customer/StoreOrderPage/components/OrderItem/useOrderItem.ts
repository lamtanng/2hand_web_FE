import { useState } from 'react';
import { orderAPIs } from '../../../../../apis/order.api';
import { handleError } from '../../../../../utils/handleError';
import { CalcExpectedDeliveryDateRequest } from '../../../../../types/http/order.type';
import { OrderProps } from '../../../../../types/order.type';
import { OrderStage } from '../../../../../types/enum/orderStage.enum';
import { orderStageAPIs } from '../../../../../apis/orderStage.api';
import eventEmitter from '../../../../../utils/eventEmitter';
import { extractISODate } from '../../../../../utils/extractISODate';

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

  const changeStage = async (date: string | null | undefined, stage: string) => {
    try {
      const data = {
        name: stage,
        orderID: order._id,
        expectedDate: date,
        orderStageStatusID: order.orderStageID.orderStageStatusID._id,
      };
      console.log(data);
      await orderStageAPIs.createOrderStage(data);
      eventEmitter.emit('orderStageChanged');
    } catch (error) {
      handleError(error);
    }
  };

  const confirmOrder = (date: any) => {
    const pickingDate = extractISODate(date.title);
    changeStage(pickingDate, OrderStage.Picking);
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
      const expDate = res.data.leadtime_order.to_estimate_date;
      changeStage(expDate, OrderStage.Delivering);
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
    isLoading,
    confirmOrder,
  };
};
export default useOrderItem;
