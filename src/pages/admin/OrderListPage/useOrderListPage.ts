import { useEffect, useState } from 'react';
import { handleError } from '../../../utils/handleError';
import { adminAPIs } from '../../../apis/admin.api';
import { OrderProps } from '../../../types/order.type';
import eventEmitter from '../../../utils/eventEmitter';
import { orderRequestsAPIs } from '../../../apis/orderRequest.api';

const useOrderListPage = () => {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [replyMessage, setReplyMessage] = useState<string>('');
  const [record, setRecord] = useState<any>();

  const getOrders = async () => {
    try {
      const res = await adminAPIs.getAllOrders(100);
      setOrders(res.data.data);
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  const processRequest = async (replyStatus: string) => {
    try {
      const data = {
        _id: record?.orderRequest?._id,
        replyMessage: replyMessage,
        replyStatus: replyStatus,
      };
      console.log(data);
      await orderRequestsAPIs.replyRequest(data);
      eventEmitter.emit('stageChanged');
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getOrders();

    const stageChageListener = eventEmitter.addListener('stageChanged', () => {
      getOrders();
    });
    return () => {
      stageChageListener.remove();
    };
  }, []);

  return {
    orders,
    isModalOpen,
    setIsModalOpen,
    setReplyMessage,
    setRecord,
    processRequest,
    record
  };
};
export default useOrderListPage;
