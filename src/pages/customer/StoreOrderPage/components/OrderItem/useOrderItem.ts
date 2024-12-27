import { useState } from 'react';
import { orderAPIs } from '../../../../../apis/order.api';
import { handleError } from '../../../../../utils/handleError';
import { CalcExpectedDeliveryDateRequest } from '../../../../../types/http/order.type';
import { OrderProps } from '../../../../../types/order.type';
import { OrderStage } from '../../../../../types/enum/orderStage.enum';
import { orderStageAPIs } from '../../../../../apis/orderStage.api';
import eventEmitter from '../../../../../utils/eventEmitter';
import { extractISODate } from '../../../../../utils/extractISODate';
import { reasonAPIs } from '../../../../../apis/reason.api';
import { ObjectType } from '../../../../../types/enum/objectType.enum';
import { TaskType } from '../../../../../types/enum/taskType.type';
import { orderRequestsAPIs } from '../../../../../apis/orderRequest.api';
import { PickupDateProps } from '../../../../../types/http/pickupDate.type';
import { ReasonProps } from '../../../../../types/http/reason.type';
import { NewOrderStage } from '../../../../../types/http/orderStage.type';
import { Role } from '../../../../../types/enum/role.enum';

const useOrderItem = (order: OrderProps) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [pickupDates, setPickupDates] = useState<PickupDateProps[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [cancelReasons, setCancelReasons] = useState<ReasonProps[]>([]);

  const pickingOrder = async () => {
    try {
      const res = await orderAPIs.getPickupDate();
      setPickupDates(res.data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsPickupModalOpen(true);
    }
  };

  const changeStage = async (date: string | null | undefined, stage: string) => {
    try {
      const data: NewOrderStage = {
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

  const confirmOrder = (date: PickupDateProps | undefined) => {
    const pickingDate = extractISODate(date?.title);
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

  const getReasons = async () => {
    try {
      const res = await reasonAPIs.getAllReason();
      setCancelReasons(
        res.data.reasons.filter(
          (item: ReasonProps) =>
            item.objectType === ObjectType.Order && item.taskType === TaskType.Cancel && item.role === Role.Seller,
        ),
      );
    } catch (error) {
      handleError(error);
    }
  };

  const openCancelModal = () => {
    setIsCancelModalOpen(true);
    getReasons();
  };

  const directCancel = async (reason: ReasonProps | undefined) => {
    try {
      const data = {
        name: order.orderStageID.name,
        status: order.orderStageID.orderStageStatusID.status,
        orderStageID: order.orderStageID.orderStageStatusID.orderStageID,
        description: 'Direct Cancel',
        taskType: TaskType.Cancel,
        reasonID: reason?._id,
      };
      console.log(data);
      await orderRequestsAPIs.createNewRequest(data);
      eventEmitter.emit('orderStageChanged');
    } catch (error) {
      handleError(error);
    }
  };

  return {
    pickingOrder,
    pickupDates,
    deliveringOrder,
    isLoading,
    confirmOrder,
    cancelReasons,
    openCancelModal,
    directCancel,
    isCancelModalOpen,
    isPickupModalOpen,
    setIsCancelModalOpen,
    setIsPickupModalOpen,
  };
};
export default useOrderItem;
