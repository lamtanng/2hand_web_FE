import { notificationPaths } from "../constants/apiPaths/notificationPaths";
import { axiosClient } from "./axios";

const getNotificationUrl = (url: string) => `${notificationPaths.notificationPath}/${url}`;
const notificationUrl = getNotificationUrl('');

const getAllNotification = () => {
  return axiosClient.get(notificationUrl);
};

export const notificationAPIs = { getAllNotification };
