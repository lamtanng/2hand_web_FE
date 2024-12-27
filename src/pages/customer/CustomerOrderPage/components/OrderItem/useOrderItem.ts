import { useState } from 'react';
import { handleError } from '../../../../../utils/handleError';
import { OrderProps } from '../../../../../types/order.type';
import { orderStageAPIs } from '../../../../../apis/orderStage.api';
import eventEmitter from '../../../../../utils/eventEmitter';
import { OrderStage } from '../../../../../types/enum/orderStage.enum';
import { Modal } from 'antd';
import { reasonAPIs } from '../../../../../apis/reason.api';
import { ObjectType } from '../../../../../types/enum/objectType.enum';
import { TaskType } from '../../../../../types/enum/taskType.type';
import { orderRequestsAPIs } from '../../../../../apis/orderRequest.api';
import { ReasonProps } from '../../../../../types/http/reason.type';
import { NewOrderStage } from '../../../../../types/http/orderStage.type';
import { Role } from '../../../../../types/enum/role.enum';

const useOrderItem = (order: OrderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReasons, setCancelReasons] = useState<ReasonProps[]>([]);
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

  const getReasons = async () => {
    try {
      const res = await reasonAPIs.getAllReason();
      setCancelReasons(
        res.data.reasons.filter(
          (item: ReasonProps) =>
            item.objectType === ObjectType.Order && item.taskType === TaskType.Cancel && item.role === Role.Customer,
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
      const data: NewOrderStage = {
        name: stage,
        orderID: order._id,
        expectedDate: date,
        orderStageStatusID: order.orderStageID.orderStageStatusID._id,
      };
      console.log(data);
      await orderStageAPIs.createOrderStage(data);
      eventEmitter.emit('customerOrderStageChanged');
    } catch (error) {
      handleError(error);
    }
  };

  const cancelOrder = async (reason: ReasonProps | undefined) => {
    try {
      const data = {
        name: order.orderStageID.name,
        status: order.orderStageID.orderStageStatusID.status,
        orderStageID: order.orderStageID.orderStageStatusID.orderStageID,
        description: description,
        taskType: TaskType.Cancel,
        reasonID: reason?._id,
      };
      console.log(data);
      await orderRequestsAPIs.createNewRequest(data);
      eventEmitter.emit('customerOrderStageChanged');
    } catch (error) {
      handleError(error);
    }
  };

  const receiveOrder = () => {
    showConfirm();
  };

  return { isModalOpen, setIsModalOpen, receiveOrder, cancelReasons, openCancelModal, cancelOrder, setDescription };
};
export default useOrderItem;
