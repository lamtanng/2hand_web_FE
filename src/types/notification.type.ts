import { NotificationType } from "./enum/notification.enum";

export interface NotificationProps {
  _id: string;
  title: string;
  message: string;
  type: NotificationType;
  content: string;
  receiver: string;
  relatedId: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export { NotificationType };

