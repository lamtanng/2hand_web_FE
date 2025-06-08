import {
  DeleteOutlined,
  DollarOutlined,
  InfoCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, List, Spin, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { NotificationProps, NotificationType } from '../../../types/notification.type';

interface NotificationConfig {
  icon: React.ReactNode;
  color: string;
  tagText: string;
}

interface NotificationListProps {
  notifications: NotificationProps[];
  loading: boolean;
  fetchMore: () => void;
  hasMore: boolean;
  onClose: () => void;
  ownerId: string | undefined;
  markAsRead: (id: string, ownerId: string) => void;
  markAllAsRead: (receiverId?: string, ownerId?: string) => void;
  clearNotifications: (receiverId?: string, ownerId?: string) => void;
}

const getNotificationConfig = (type: NotificationType): NotificationConfig => {
  switch (type) {
    case NotificationType.Order:
      return {
        icon: <ShoppingCartOutlined className="text-blue-500" />,
        color: 'blue',
        tagText: 'Order',
      };
    case NotificationType.Finance:
      return {
        icon: <DollarOutlined className="text-green-500" />,
        color: 'green',
        tagText: 'Finance',
      };
    case NotificationType.System:
      return {
        icon: <InfoCircleOutlined className="text-orange-500" />,
        color: 'orange',
        tagText: 'System',
      };
    case NotificationType.Product:
      return {
        icon: <ShoppingOutlined className="text-purple-500" />,
        color: 'purple',
        tagText: 'Product',
      };
    case NotificationType.User:
      return {
        icon: <UserOutlined className="text-cyan-500" />,
        color: 'cyan',
        tagText: 'User',
      };
  }
};

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  loading,
  fetchMore,
  hasMore,
  onClose,
  ownerId,
  markAsRead,
  markAllAsRead,
  clearNotifications,
}) => {
  const navigate = useNavigate();

  const redirect = (notiType: NotificationType, id: string) => {
    if (notiType === NotificationType.Order) return navigate(`/account/purchase/${id}`);

    if (notiType === NotificationType.Finance) return navigate(`/finance/${id}`);

    if (notiType === NotificationType.Product) return navigate(`/products/${id}`);

    if (notiType === NotificationType.User) return navigate(`/users/${id}`);

    if (notiType === NotificationType.System) return navigate(`/system/${id}`);
  };

  const handleNotificationClick = (notification: NotificationProps) => {
    if (!notification.isRead && ownerId) {
      markAsRead(notification._id, ownerId);
    }
    redirect(notification.type, notification.relatedId);
    onClose();
  };

  return (
    <div id={`scrollableDiv-${ownerId}`} className="max-h-[calc(100vh-200px)] overflow-y-auto">
      <div className="mb-2 flex items-center justify-between border-b border-gray-200 pb-2">
        <Typography.Title level={5} className="m-0">
          Notifications
        </Typography.Title>
        <div className="flex items-center gap-2">
          {notifications.length > 0 && (
            <>
              <Button type="link" onClick={() => markAllAsRead(ownerId)} className="px-0">
                Mark all as read
              </Button>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => clearNotifications(ownerId)}
                className="text-red-500 hover:text-red-600"
              />
            </>
          )}
        </div>
      </div>
      <Spin spinning={loading && notifications.length === 0}>
        <InfiniteScroll
          dataLength={notifications.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<div className="py-2 text-center text-gray-400">Loading...</div>}
          endMessage={<div className="py-2 text-center text-gray-400">No more notifications</div>}
          scrollableTarget={`scrollableDiv-${ownerId}`}
          style={{ overflow: 'unset', maxWidth: '400px', minWidth: '400px' }}
        >
          {notifications.map((notification) => {
            const config = getNotificationConfig(notification.type);
            return (
              <List.Item
                className={`cursor-pointer transition-colors duration-200 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <List.Item.Meta
                  className="flex flex-row items-start gap-3"
                  avatar={config.icon}
                  title={
                    <div className="flex items-center gap-2">
                      <span className="flex-grow">{notification.title}</span>
                      <Tag color={config.color} className="ml-2">
                        {config.tagText}
                      </Tag>
                    </div>
                  }
                  description={
                    <div>
                      <div className="mb-1" dangerouslySetInnerHTML={{ __html: notification.content }} />
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{dayjs(notification.createdAt).fromNow()}</span>
                        {!notification.isRead && <span className="h-2 w-2 rounded-full bg-blue-500"></span>}
                      </div>
                    </div>
                  }
                />
              </List.Item>
            );
          })}
        </InfiniteScroll>
      </Spin>
    </div>
  );
};

export default NotificationList;
