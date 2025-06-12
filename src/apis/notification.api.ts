import { notificationPaths } from '../constants/apiPaths/notificationPaths';
import {
  CountNotificationResponse,
  GetNotificationsRequest,
  GetNotificationsResponse,
} from '../types/http/notification.type';
import { axiosClient } from './axios';

const getNotificationUrl = (url: string) => `${notificationPaths.notificationPath}/${url}`;
const notificationUrl = getNotificationUrl('');

const getAllNotification = (payload: GetNotificationsRequest) => {
  return axiosClient.get<GetNotificationsResponse>(notificationUrl, { params: payload });
};

const countNotification = (ids: string[]) => {
  return axiosClient.get<CountNotificationResponse>(`${notificationPaths.notificationPath}-count`, {
    params: {
      ids: ids.filter((id) => id),
    },
    paramsSerializer: { indexes: null },
  });
};

const markAsRead = (_id: string) => {
  return axiosClient.post(getNotificationUrl(`mark-as-read`), {
    _id,
  });
};

const markAllAsRead = (receiverId: string) => {
  return axiosClient.put(getNotificationUrl(`receiver/${receiverId}`));
};

const deleteNotification = (_id: string) => {
  return axiosClient.delete(getNotificationUrl(`${_id}`));
};

const clearNotifications = (receiverId: string) => {
  return axiosClient.delete(getNotificationUrl(`receiver/${receiverId}`));
};

export const notificationAPIs = {
  getAllNotification,
  countNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearNotifications,
};
