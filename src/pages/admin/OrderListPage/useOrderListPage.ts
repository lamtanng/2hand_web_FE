import { useEffect, useState } from 'react';
import { handleError } from '../../../utils/handleError';
import { adminAPIs } from '../../../apis/admin.api';
import { OrderProps } from '../../../types/order.type';
import eventEmitter from '../../../utils/eventEmitter';
import { orderRequestsAPIs } from '../../../apis/orderRequest.api';
import { message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderStage } from '../../../types/enum/orderStage.enum';

const useOrderListPage = () => {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [replyMessage, setReplyMessage] = useState<string>('');
  const [record, setRecord] = useState<any>();

  // Add state for active filter and tab
  const [activeStageFilter, setActiveStageFilter] = useState<OrderStage | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

  // Get location to access navigation state
  const location = useLocation();
  const navigate = useNavigate();

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

  // Apply filters from navigation state and update URL
  useEffect(() => {
    if (location.state) {
      const { filterStage, activeTab: tab } = location.state as {
        filterStage?: OrderStage;
        activeTab?: string;
      };

      if (filterStage) {
        setActiveStageFilter(filterStage);
      }

      if (tab) {
        setActiveTab(tab);
      }

      // Clear the location state after using it to prevent it from persisting
      // This prevents the filter from being reapplied when navigating back
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    getOrders();

    const stageChageListener = eventEmitter.addListener('stageChanged', () => {
      getOrders();
    });
    return () => {
      stageChageListener.remove();
    };
  }, []);

  // Get filtered orders based on active filter
  const getFilteredOrders = () => {
    if (!activeStageFilter) return orders;

    return orders.filter((order) => order?.orderStageID?.name === activeStageFilter);
  };

  return {
    orders: getFilteredOrders(),
    allOrders: orders,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    setReplyMessage,
    setRecord,
    processRequest,
    record,
    refreshOrders,
    activeStageFilter,
    setActiveStageFilter,
    activeTab,
    setActiveTab,
  };
};

export default useOrderListPage;
