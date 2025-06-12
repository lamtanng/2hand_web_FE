import { BellOutlined } from '@ant-design/icons';
import { Badge, Button, Popover, Tabs } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState } from 'react';
import { notificationAPIs } from '../../../apis/notification.api';
import { useNotification } from '../../../context/NotificationContext';
import { useAppSelector } from '../../../redux/hooks';
import { loginSelector } from '../../../redux/slices/login.slice';
import { NotificationProps } from '../../../types/notification.type';
import NotificationList from './NotificationList';

dayjs.extend(relativeTime);

const NotificationBell: React.FC = () => {
  const { unreadCount, markAllAsRead, markAsRead, clearNotifications } = useNotification();
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
      const res = await notificationAPIs.getAllNotification({ _id: ownerId, limit: 20, page });
      const data = res.data?.data || [];
      if (page === 1) {
        setter(data);
      } else {
        setter((prev) => [...prev, ...data]);
      }
      setHasMore(!!res.data?.nextPage);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key as 'user' | 'store');
    if (key === 'user' && user._id) {
      setUserPage(1);
      fetchNotifications(user._id, setUserNotifications, 1, setUserHasMore);
    }
    if (key === 'store' && user.storeId) {
      setStorePage(1);
      fetchNotifications(user.storeId, setStoreNotifications, 1, setStoreHasMore);
    }
  };

  const handlePopoverOpen = () => {
    if (activeTab === 'user' && user._id) {
      setUserPage(1);
      fetchNotifications(user._id, setUserNotifications, 1, setUserHasMore);
    }
    if (activeTab === 'store' && user.storeId) {
      setStorePage(1);
      fetchNotifications(user.storeId, setStoreNotifications, 1, setStoreHasMore);
    }
  };

  const fetchMoreUser = () => {
    if (user._id) {
      const nextPage = userPage + 1;
      setUserPage(nextPage);
      fetchNotifications(user._id, setUserNotifications, nextPage, setUserHasMore);
    }
  };
  const fetchMoreStore = () => {
    if (user.storeId) {
      const nextPage = storePage + 1;
      setStorePage(nextPage);
      fetchNotifications(user.storeId, setStoreNotifications, nextPage, setStoreHasMore);
    }
  };

  const userUnread = user._id && unreadCount && unreadCount[user._id]?.unread ? unreadCount[user._id].unread : 0;
  const storeUnread =
    user.storeId && unreadCount && unreadCount[user.storeId]?.unread ? unreadCount[user.storeId].unread : 0;

  const tabItems = [
    {
      key: 'user',
      label: (
        <span>
          User Notifications{' '}
          <Badge count={userUnread} size="default" style={{ backgroundColor: '#1677ff' }} offset={[4, 0]} />
        </span>
      ),
      children: (
        <NotificationList
          onClose={() => {}}
          ownerId={user._id}
          loading={loading && activeTab === 'user'}
          notifications={userNotifications}
          fetchMore={fetchMoreUser}
          hasMore={userHasMore}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          clearNotifications={clearNotifications}
        />
      ),
    },
    {
      key: 'store',
      label: (
        <span>
          Store Notifications{' '}
          <Badge count={storeUnread} size="default" style={{ backgroundColor: '#faad14' }} offset={[4, 0]} />
        </span>
      ),
      children: (
        <NotificationList
          onClose={() => {}}
          ownerId={user.storeId}
          loading={loading && activeTab === 'store'}
          notifications={storeNotifications}
          fetchMore={fetchMoreStore}
          hasMore={storeHasMore}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          clearNotifications={clearNotifications}
        />
      ),
    },
  ];

  const totalUnread = unreadCount ? Object.values(unreadCount).reduce((sum, item) => sum + item.unread, 0) : 0;

  return (
    <Popover
      placement="bottomRight"
      trigger="click"
      arrow={false}
      overlayClassName="notification-popover"
      content={
        <Tabs
          defaultActiveKey="user"
          activeKey={activeTab}
          onChange={handleTabChange}
          items={tabItems}
          className="notification-tabs"
        />
      }
      onOpenChange={(visible) => visible && handlePopoverOpen()}
    >
      <Badge count={totalUnread} offset={[-5, 5]}>
        <Button
          type="text"
          icon={<BellOutlined className="text-xl" />}
          className="flex h-12 w-12 items-center justify-center text-blue-600 hover:bg-gray-100"
        />
      </Badge>
    </Popover>
  );
};

export default NotificationBell;
