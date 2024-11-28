import { useEffect, useState } from 'react';
import { orderAPIs } from '../../../apis/order.api';
import { handleError } from '../../../utils/handleError';
import { useParams } from 'react-router-dom';
import { OrderProps } from '../../../types/order.type';
import { reasonAPIs } from '../../../apis/reason.api';
import { orderStageAPIs } from '../../../apis/orderStage.api';
import eventEmitter from '../../../utils/eventEmitter';
import { TaskType } from '../../../types/enum/taskType.type';
import { orderRequestsAPIs } from '../../../apis/orderRequest.api';
import { Modal } from 'antd';
import { OrderStage } from '../../../types/enum/orderStage.enum';
import { ObjectType } from '../../../types/enum/objectType.enum';

const useCustomerOrderDetailPage = () => {
  const params = useParams();
  const [order, setOrder] = useState<OrderProps>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReasons, setCancelReasons] = useState<any[]>([]);
  const [returnReasons, setReturnReasons] = useState<any[]>([]);
  const [description, setDescription] = useState<string>('');

  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: 'Do you confirm to receive this order?',
      onOk() {
        changeStage(new Date().toISOString(), OrderStage.Delivered);
      },
    });
  };

  const getSingleOrder = async (orderID: string | undefined) => {
    try {
      const res = await orderAPIs.getOrderByID(orderID);
      setOrder(res.data);
    } catch (error) {
      handleError;
    } finally {
    }
  };

  const getReasons = async () => {
    try {
      const res = await reasonAPIs.getAllReason();
      setCancelReasons(
        res.data.reasons.filter(
          (item: any) => item.objectType === ObjectType.Order && item.taskType === TaskType.Cancel,
        ),
      );
      setReturnReasons(
        res.data.reasons.filter(
          (item: any) => item.objectType === ObjectType.Order && item.taskType === TaskType.Return,
        ),
      );
    } catch (error) {
      handleError(error);
    }
  };

  const openCancelModal = () => {
    setIsModalOpen(true);
    getReasons();
  };

  const changeStage = async (date: string, stage: string) => {
    try {
      const data = {
        name: stage,
        orderID: order?._id,
        expectedDate: date,
        orderStageStatusID: order?.orderStageID.orderStageStatusID._id,
      };
      console.log(data);
      await orderStageAPIs.createOrderStage(data);
      eventEmitter.emit('customerOrderDetailStageChanged', order?._id);
    } catch (error) {
      handleError(error);
    }
  };

  const directCancel = async (reason: any) => {
    try {
      const data = {
        name: order?.orderStageID.name,
        status: order?.orderStageID.orderStageStatusID.status,
        orderStageID: order?.orderStageID.orderStageStatusID.orderStageID,
        description: 'Direct Cancel',
        taskType: TaskType.Cancel,
        reasonID: reason._id,
      };
      await orderRequestsAPIs.createNewRequest(data);
      eventEmitter.emit('customerOrderDetailStageChanged', order?._id);
    } catch (error) {
      handleError(error);
    }
  };

  const cancelOrder = async (reason: any) => {
    try {
      const data = {
        name: order?.orderStageID.name,
        status: order?.orderStageID.orderStageStatusID.status,
        orderStageID: order?.orderStageID.orderStageStatusID.orderStageID,
        description: description,
        taskType: TaskType.Cancel,
        reasonID: reason._id,
      };
      console.log(data);
      await orderRequestsAPIs.createNewRequest(data);
      eventEmitter.emit('customerOrderDetailStageChanged', order?._id);
    } catch (error) {
      handleError(error);
    }
  };

  const receiveOrder = () => {
    showConfirm();
  };

  useEffect(() => {
    getSingleOrder(params?.id);

    const orderStageChangeListener = eventEmitter.addListener('customerOrderDetailStageChanged', (orderID: string) => {
      getSingleOrder(orderID);
    });

    return () => {
      orderStageChangeListener.remove();
    };
  }, []);

  return {
    order,
    isModalOpen,
    setIsModalOpen,
    cancelReasons,
    returnReasons,
    openCancelModal,
    directCancel,
    receiveOrder,
    setDescription,
    cancelOrder,
  };
};
export default useCustomerOrderDetailPage;
