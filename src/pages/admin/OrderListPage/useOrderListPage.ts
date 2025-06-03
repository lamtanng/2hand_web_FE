import { useEffect, useState } from 'react';
import { handleError } from '../../../utils/handleError';
import { adminAPIs } from '../../../apis/admin.api';
import { OrderProps } from '../../../types/order.type';
import eventEmitter from '../../../utils/eventEmitter';
import { orderRequestsAPIs } from '../../../apis/orderRequest.api';
import { message } from 'antd';

const useOrderListPage = () => {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [replyMessage, setReplyMessage] = useState<string>('');
  const [record, setRecord] = useState<any>();

  const getOrders = async () => {
    try {
      setIsLoading(true);
      const res = await adminAPIs.getAllOrders(100);
      setOrders(res.data.data);
    } catch (error) {
      handleError(error);
      message.error('Failed to fetch order data');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshOrders = async () => {
    message.loading('Refreshing order data...');
    await getOrders();
    message.success('Order data refreshed successfully');
  };

  const processRequest = async (replyStatus: string) => {
    try {
      message.loading('Processing request...');
      const data = {
        _id: record?.orderRequest?._id,
        replyMessage: replyMessage,
        replyStatus: replyStatus,
      };
      await orderRequestsAPIs.replyRequest(data);
      eventEmitter.emit('stageChanged');
      message.success(`Request ${replyStatus.toLowerCase()} successfully`);
    } catch (error) {
      handleError(error);
      message.error('Failed to process request');
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
    isLoading,
    isModalOpen,
    setIsModalOpen,
    setReplyMessage,
    setRecord,
    processRequest,
    record,
    refreshOrders
  };
};
export default useOrderListPage;
