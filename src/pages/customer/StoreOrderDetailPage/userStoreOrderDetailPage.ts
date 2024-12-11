import { useEffect, useState } from 'react';
import { handleError } from '../../../utils/handleError';
import { orderAPIs } from '../../../apis/order.api';
import { useParams } from 'react-router-dom';
import { CalcExpectedDeliveryDateRequest } from '../../../types/http/order.type';
import { OrderProps } from '../../../types/order.type';
import { orderStageAPIs } from '../../../apis/orderStage.api';
import eventEmitter from '../../../utils/eventEmitter';
import { extractISODate } from '../../../utils/extractISODate';
import { OrderStage } from '../../../types/enum/orderStage.enum';
import { reasonAPIs } from '../../../apis/reason.api';
import { ObjectType } from '../../../types/enum/objectType.enum';
import { TaskType } from '../../../types/enum/taskType.type';
import { orderRequestsAPIs } from '../../../apis/orderRequest.api';
import { ReasonProps } from '../../../types/http/reason.type';
import { PickupDateProps } from '../../../types/http/pickupDate.type';
import { NewRequestProps } from '../../../types/http/orderRequest.type';
import { NewOrderStage } from '../../../types/http/orderStage.type';
import { OrderStageTrackingProps } from '../../../types/orderTracking.type';
import { Role } from '../../../types/enum/role.enum';

const useStoreOrderDetailPage = () => {
  const params = useParams();
  const [order, setOrder] = useState<OrderProps>();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [pickupDates, setPickupDates] = useState<PickupDateProps[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [cancelReasons, setCancelReasons] = useState<ReasonProps[]>([]);
  const [rejectReasons, setRejectReasons] = useState<ReasonProps[]>([]);
  const [stages, setStages] = useState<OrderStageTrackingProps[]>([]);

  const getSingleOrder = async (orderID: string | undefined) => {
    const res = await orderAPIs.getOrderByID(orderID);
    setOrder(res.data);
  };

  const trackingSingleOrder = async (orderID: string | undefined) => {
    const res = await orderAPIs.trackingOrder(orderID);
    setStages(res.data);
  };

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
        orderID: order?._id,
        expectedDate: date,
        orderStageStatusID: order?.orderStageID.orderStageStatusID._id,
      };
      console.log(data);
      await orderStageAPIs.createOrderStage(data);
      eventEmitter.emit('orderDetailStageChanged', order?._id);
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
        ShopID: Number(order?.storeID.ghnStoreID),
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
      setRejectReasons(
        res.data.reasons.filter(
          (item: ReasonProps) => item.objectType === ObjectType.Order && item.taskType === TaskType.RejectRequest && item.role === Role.Seller,
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
      const data: NewRequestProps = {
        name: order?.orderStageID.name,
        status: order?.orderStageID.orderStageStatusID.status,
        orderStageID: order?.orderStageID.orderStageStatusID.orderStageID,
        description: 'Direct Cancel',
        taskType: TaskType.Cancel,
        reasonID: reason?._id,
      };
      console.log(data);
      await orderRequestsAPIs.createNewRequest(data);
      eventEmitter.emit('orderDetailStageChanged', order?._id);
    } catch (error) {
      handleError(error);
    }
  };

  const fetchData = async (orderID: string | undefined) => {
    try {
      await getSingleOrder(orderID);
      await trackingSingleOrder(orderID);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    fetchData(params.id);
    getReasons();

    const orderStageChangeListener = eventEmitter.addListener('orderDetailStageChanged', (orderID: string) => {
      fetchData(orderID);
    });

    return () => {
      orderStageChangeListener.remove();
    };
  }, []);

  return {
    order,
    pickingOrder,
    pickupDates,
    deliveringOrder,
    isLoading,
    confirmOrder,
    cancelReasons,
    rejectReasons,
    openCancelModal,
    directCancel,
    isCancelModalOpen,
    isPickupModalOpen,
    setIsCancelModalOpen,
    setIsPickupModalOpen,
    stages,
  };
};
export default useStoreOrderDetailPage;
