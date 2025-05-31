import React from 'react';
import { Badge, Button, List, Popover, Typography, Tag } from 'antd';
import {
  BellOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  InfoCircleOutlined,
  ShoppingOutlined,
  UserOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useNotification } from '../../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { NotificationProps, NotificationType } from '../../../types/notification.type';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface NotificationConfig {
  icon: React.ReactNode;
  color: string;
  tagText: string;
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

interface NotificationListProps {
  onClose: () => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ onClose }) => {
  const { notifications, markAsRead, markAllAsRead, clearNotifications } = useNotification();
  const navigate = useNavigate();

  const handleNotificationClick = (notification: NotificationProps) => {
    if (!notification.isRead) {
      markAsRead(notification._id);
    }

    // Navigate based on notification type and relatedId
    if (notification.relatedId) {
      switch (notification.type) {
        case NotificationType.Order:
          navigate(`/orders/${notification.relatedId}`);
          break;
        case NotificationType.Product:
          navigate(`/products/${notification.relatedId}`);
          break;
        case NotificationType.User:
          navigate(`/users/${notification.relatedId}`);
          break;
        case NotificationType.Finance:
          navigate(`/finance/${notification.relatedId}`);
          break;
        default:
          break;
      }
    }

    onClose();
  };

  return (
    <div className="w-96">
      <div className="mb-2 flex items-center justify-between border-b border-gray-200 pb-2">
        <Typography.Title level={5} className="m-0">
          Notifications
        </Typography.Title>
        <div className="flex items-center gap-2">
          {notifications.length > 0 && (
            <>
              <Button type="link" onClick={markAllAsRead} className="px-0">
                Mark all as read
              </Button>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={clearNotifications}
                className="text-red-500 hover:text-red-600"
              />
            </>
          )}
        </div>
      </div>
      <List
        className="max-h-[calc(100vh-200px)] overflow-y-auto"
        dataSource={notifications}
        renderItem={(notification) => {
          const config = getNotificationConfig(notification.type);
          return (
            <List.Item
              className={`cursor-pointer transition-colors duration-200 hover:bg-gray-50 ${
                !notification.isRead ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <List.Item.Meta
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
                    <p className="mb-1">{notification.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{dayjs(notification.createdAt).fromNow()}</span>
                      {!notification.isRead && <span className="h-2 w-2 rounded-full bg-blue-500"></span>}
                    </div>
                  </div>
                }
              />
            </List.Item>
          );
        }}
        locale={{
          emptyText: (
            <div className="py-8 text-center text-gray-500">
              <BellOutlined className="mb-2 text-2xl" />
              <p>No notifications</p>
            </div>
          ),
        }}
      />
    </div>
  );
};

const NotificationBell: React.FC = () => {
  const { unreadCount } = useNotification();

  return (
    <Popover
      placement="bottomRight"
      trigger="click"
      arrow={false}
      overlayClassName="notification-popover"
      content={<NotificationList onClose={() => {}} />}
    >
      <Badge count={unreadCount} offset={[-5, 5]}>
        <Button
          type="text"
          icon={<BellOutlined className="text-xl" />}
          className="flex h-12 w-12 items-center justify-center hover:bg-gray-100 text-blue-600"
        />
      </Badge>
    </Popover>
  );
};

export default NotificationBell;
