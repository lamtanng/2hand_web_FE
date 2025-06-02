import React, { createContext, useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { notificationAPIs } from '../apis/notification.api';
import { initializeSocket } from '../config/socket';
import { useAppSelector } from '../redux/hooks';
import { loginSelector } from '../redux/slices/login.slice';
import { CountNotificationResponse, GetNotificationsRequest } from '../types/http/notification.type';
import { NotificationProps } from '../types/notification.type';
import { displayInfo } from '../utils/displayToast';

interface NotificationContextProps {
  notifications: NotificationProps[];
  unreadCount: CountNotificationResponse | null;
  markAsRead: (notificationId: string, ownerId: string) => void;
  markAllAsRead: (receiverId?: string, ownerId?: string) => void;
  clearNotifications: (receiverId?: string, ownerId?: string) => void;
  fetchNotificationCount: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [unreadCount, setUnreadCount] = useState<CountNotificationResponse | null>(null);
  const { user, token } = useAppSelector(loginSelector);

  // Fetch tổng số lượng chưa đọc cho cả user và store
  const fetchNotificationCount = async () => {
    if (!user._id && !user.storeId) return;
    let total = 0;
    let ids = [];
    if (user._id) ids.push(user._id);
    if (user.storeId) ids.push(user.storeId);

    const res = await notificationAPIs.countNotification(ids);
    console.log('res', res);
    setUnreadCount(res.data);
  };

  useEffect(() => {
    fetchNotificationCount();
  }, [user._id, user.storeId]);

  useEffect(() => {
    const initSocket = async () => {
      if (token.accessToken) {
        try {
          const socketInstance = initializeSocket(token.accessToken);

          setSocket(socketInstance);

          socketInstance.on('connect', () => {
            console.log('Socket connected!');
            console.log('Auto-joined rooms based on auth data');
          });

          socketInstance.on('connect_error', (err) => {
            console.error('Connection error:', err.message);

            if (err.message.includes('MISSING_TOKEN') || err.message.includes('INVALID_TOKEN')) {
              console.log('Token error, attempting refresh...');
              // Thêm logic refresh token ở đây
            }
          });

          console.log('Requested initial notifications');
        } catch (error) {
          console.error('Error initializing socket:', error);
        }
      }
    };

    initSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [token.accessToken, user._id, user.storeId]);

  useEffect(() => {
    console.log('socket', socket);
    if (!socket) return;

    console.log('Setting up socket event listeners');

    // Listen for initial notifications list
    socket.on('notifications_list', (notificationsList: NotificationProps[]) => {
      console.log('Received notifications list:', notificationsList);
      setNotifications(notificationsList);
      // setUnreadCount(notificationsList.filter((n) => !n.isRead).length);
    });

    // Listen for new notifications
    socket.on('notification', (notification: NotificationProps) => {
      console.log('Received new notification:', notification);
      setNotifications((prev) => [notification, ...prev]);
      // setUnreadCount((prev) => prev + 1);

      // Show toast notification
      displayInfo(notification.title);
    });

    // Listen for notification updates
    socket.on('notification_updated', (updatedNotification: NotificationProps) => {
      console.log('Notification updated:', updatedNotification);
      setNotifications((prev) => prev.map((n) => (n._id === updatedNotification._id ? updatedNotification : n)));
    });

    // Listen for notification deletion
    socket.on('notification_deleted', (notificationId: string) => {
      console.log('Notification deleted:', notificationId);
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
      // setUnreadCount((prev) => Math.max(0, prev - 1));
    });

    return () => {
      console.log('Cleaning up socket event listeners');
      socket.off('notifications_list');
      socket.off('notification');
      socket.off('notification_updated');
      socket.off('notification_deleted');
    };
  }, [socket]);

  const markAsRead = async (_id: string, ownerId: string) => {
    if (!socket) return;
    await notificationAPIs.markAsRead(_id);
    setNotifications((prev) => prev.map((n) => (n._id === _id ? { ...n, isRead: true } : n)));
    setUnreadCount((prev) => {
      if (!prev) return null;
      const newUnreadCount = { ...prev };
      if (newUnreadCount[ownerId]) {
        newUnreadCount[ownerId].unread -= 1;
      }
      return newUnreadCount;
    });
  };

  const markAllAsRead = async (receiverId?: string, ownerId?: string) => {
    if (!socket || !receiverId || !ownerId) return;
    await notificationAPIs.markAllAsRead(receiverId);

    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount((prev) => {
      if (!prev) return null;
      const newUnreadCount = { ...prev };
      if (newUnreadCount[ownerId]) {
        newUnreadCount[ownerId].unread = 0;
      }
      return newUnreadCount;
    });
  };

  const clearNotifications = async (receiverId?: string, ownerId?: string) => {
    if (!socket || !receiverId || !ownerId) return;
    await notificationAPIs.clearNotifications(receiverId);

    setNotifications([]);
    setUnreadCount((prev) => {
      if (!prev) return null;
      const newUnreadCount = { ...prev };
      if (newUnreadCount[ownerId]) {
        delete newUnreadCount[ownerId];
      }
      return newUnreadCount;
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        fetchNotificationCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
