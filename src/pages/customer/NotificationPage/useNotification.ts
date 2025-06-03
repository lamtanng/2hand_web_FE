import { useState, useEffect } from 'react';
import { useNotification as useNotificationContext } from '../../../context/NotificationContext';
import { useAppSelector } from '../../../redux/hooks';
import { loginSelector } from '../../../redux/slices/login.slice';
import { NotificationProps } from '../../../types/notification.type';
import { notificationAPIs } from '../../../apis/notification.api';

const useNotificationPage = () => {
  const { markAsRead, markAllAsRead, clearNotifications } = useNotificationContext();
  const { user } = useAppSelector(loginSelector);
  const [activeTab, setActiveTab] = useState<'user' | 'store'>('user');
  const [loading, setLoading] = useState(false);
  const [userNotifications, setUserNotifications] = useState<NotificationProps[]>([]);
  const [storeNotifications, setStoreNotifications] = useState<NotificationProps[]>([]);
  const [userPage, setUserPage] = useState(1);
  const [userHasMore, setUserHasMore] = useState(true);
  const [storePage, setStorePage] = useState(1);
  const [storeHasMore, setStoreHasMore] = useState(true);

  const fetchNotifications = async (
    ownerId: string,
    setter: React.Dispatch<React.SetStateAction<NotificationProps[]>>,
    page: number,
    setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setLoading(true);
    try {
      const res = await notificationAPIs.getAllNotification({ _id: ownerId, limit: 10, page });
      const data = res.data?.data || [];
      if (page === 1) {
        setter(data);
      } else {
        setter((prev) => [...prev, ...data]);
      }
      setHasMore(!!res.data?.nextPage);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key as 'user' | 'store');
  };

  const fetchMoreUserNotifications = () => {
    if (loading || !user._id) return;
    setUserPage((prev) => prev + 1);
    fetchNotifications(user._id, setUserNotifications, userPage + 1, setUserHasMore);
  };

  const fetchMoreStoreNotifications = () => {
    if (loading || !user.storeId) return;
    setStorePage((prev) => prev + 1);
    fetchNotifications(user.storeId, setStoreNotifications, storePage + 1, setStoreHasMore);
  };

  const handleNotificationClick = (notification: NotificationProps) => {
    if (!notification.isRead) {
      const ownerId = activeTab === 'user' ? user._id : user.storeId;
      if (ownerId) {
        markAsRead(notification._id, ownerId);
      }
    }
  };

  const handleMarkAllAsRead = () => {
    const ownerId = activeTab === 'user' ? user._id : user.storeId;
    const receiverId = activeTab === 'user' ? user._id : user.storeId;
    if (ownerId && receiverId) {
      markAllAsRead(receiverId, ownerId);
    }
  };

  const handleClearNotifications = () => {
    const ownerId = activeTab === 'user' ? user._id : user.storeId;
    const receiverId = activeTab === 'user' ? user._id : user.storeId;
    if (ownerId && receiverId) {
      clearNotifications(receiverId, ownerId);
    }
  };

  useEffect(() => {
    if (user._id && activeTab === 'user') {
      setUserPage(1);
      fetchNotifications(user._id, setUserNotifications, 1, setUserHasMore);
    }
  }, [user._id, activeTab]);

  useEffect(() => {
    if (user.storeId && activeTab === 'store') {
      setStorePage(1);
      fetchNotifications(user.storeId, setStoreNotifications, 1, setStoreHasMore);
    }
  }, [user.storeId, activeTab]);

  const notifications = activeTab === 'user' ? userNotifications : storeNotifications;
  const hasMore = activeTab === 'user' ? userHasMore : storeHasMore;
  const fetchMore = activeTab === 'user' ? fetchMoreUserNotifications : fetchMoreStoreNotifications;

  return {
    activeTab,
    loading,
    notifications,
    hasMore,
    fetchMore,
    handleTabChange,
    handleNotificationClick,
    handleMarkAllAsRead,
    handleClearNotifications,
    user,
  };
};

export default useNotificationPage;
