import { ReactNode } from 'react';
import {
  BellOutlined,
  DollarOutlined,
  InfoCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { NotificationType } from '../../../types/notification.type';

export const getNotificationIcon = (type: NotificationType): ReactNode => {
  switch (type) {
    case NotificationType.Order:
      return <ShoppingCartOutlined className="text-xl text-blue-500" />;
    case NotificationType.Finance:
      return <DollarOutlined className="text-xl text-green-500" />;
    case NotificationType.System:
      return <InfoCircleOutlined className="text-xl text-orange-500" />;
    case NotificationType.Product:
      return <ShoppingOutlined className="text-xl text-purple-500" />;
    case NotificationType.User:
      return <UserOutlined className="text-xl text-cyan-500" />;
    default:
      return <BellOutlined className="text-xl text-gray-500" />;
  }
};

export const getNotificationConfig = (type: NotificationType): { color: string; tagText: string } => {
  switch (type) {
    case NotificationType.Order:
      return {
        color: 'blue',
        tagText: 'Order',
      };
    case NotificationType.Finance:
      return {
        color: 'green',
        tagText: 'Finance',
      };
    case NotificationType.System:
      return {
        color: 'orange',
        tagText: 'System',
      };
    case NotificationType.Product:
      return {
        color: 'purple',
        tagText: 'Product',
      };
    case NotificationType.User:
      return {
        color: 'cyan',
        tagText: 'User',
      };
    default:
      return {
        color: 'default',
        tagText: 'Unknown',
      };
  }
};
