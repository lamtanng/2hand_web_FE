import { useState } from 'react';
import { handleError } from '../../../../../utils/handleError';
import { OrderProps } from '../../../../../types/order.type';
import { orderStageAPIs } from '../../../../../apis/orderStage.api';
import eventEmitter from '../../../../../utils/eventEmitter';
import { OrderStage } from '../../../../../types/enum/orderStage.enum';
import { Modal } from 'antd';

const useOrderItem = (order: OrderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: 'Do you confirm to receive this order?',
      onOk() {
        changeStage(new Date().toISOString(), OrderStage.Delivered);
      },
    });
  };

  const openReviewModal = () => {
    setIsModalOpen(true);
  };

  const changeStage = async (date: string, stage: string) => {
    try {
      const data = {
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

  const receiveOrder = () => {
    showConfirm();
  };

  return { isModalOpen, setIsModalOpen, openReviewModal, receiveOrder };
};
export default useOrderItem;
