import { NotificationProps } from '../notification.type';

export enum NotificationType {
  Order = 'Order',
  Finance = 'Finance',
  System = 'System',
  Product = 'Product',
  User = 'User',
}

export interface GetNotificationsRequest {
  limit?: number;
  type?: NotificationType;
  page?: number;
  _id?: string;
}

export interface CountNotificationResponse {
  [key: string]: {
    total: number;
    unread: number;
    read: number;
  };
}

export interface GetNotificationsResponse {
  data?: NotificationProps[];
  nextPage?: number;
}
