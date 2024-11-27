import { useEffect, useState } from 'react';
import { handleError } from '../../../utils/handleError';
import { orderAPIs } from '../../../apis/order.api';
import { useParams } from 'react-router-dom';
import { CalcExpectedDeliveryDateRequest } from '../../../types/http/order.type';
import { OrderProps } from '../../../types/order.type';

const useStoreOrderDetailPage = () => {
  const params = useParams();
  const [order, setOrder] = useState<OrderProps>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickupDates, setPickupDates] = useState<any[]>([]);

  const getSingleOrder = async (orderID: string | undefined) => {
    try {
      const res = await orderAPIs.getOrderByID(orderID);
      setOrder(res.data);
    } catch (error) {
      handleError;
    } finally {
    }
  };

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
      const data: CalcExpectedDeliveryDateRequest = {
        ShopID: Number(order?.storeID.ghnStoreID),
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
    }
  };

  useEffect(() => {
    getSingleOrder(params.id);
  }, []);

  return {
    order,
    pickingOrder,
    isModalOpen,
    setIsModalOpen,
    pickupDates,
    deliveringOrder,
  };
};
export default useStoreOrderDetailPage;
