import React, { createContext, useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { getSocket, initializeSocket } from '../config/socket';
import { useAuth0 } from '@auth0/auth0-react';
import { NotificationProps } from '../types/notification.type';
import { displayInfo } from '../utils/displayToast';
import { useAppSelector } from '../redux/hooks';
import { loginSelector } from '../redux/slices/login.slice';

interface NotificationContextProps {
  notifications: NotificationProps[];
  unreadCount: number;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  // const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const { user, token } = useAppSelector(loginSelector);

  useEffect(() => {
    const initSocket = async () => {
      if (token.accessToken) {
        try {
          console.log('Initializing socket with user:', user._id);
          const socketInstance = initializeSocket(token.accessToken);

          // Join user's room using their ID
          socketInstance.emit('join', { userId: user._id });
          console.log('Emitted join event with userId:', user._id);

          setSocket(socketInstance);

          // Get initial notifications
          socketInstance.emit('get_notifications');
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
  }, [token.accessToken, user._id]);

  useEffect(() => {
    console.log('socket', socket);
    if (!socket) return;

    console.log('Setting up socket event listeners');

    // Listen for initial notifications list
    socket.on('notifications_list', (notificationsList: NotificationProps[]) => {
      console.log('Received notifications list:', notificationsList);
      setNotifications(notificationsList);
      setUnreadCount(notificationsList.filter((n) => !n.isRead).length);
    });

    // Listen for new notifications
    socket.on('notification', (notification: NotificationProps) => {
      console.log('Received new notification:', notification);
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);

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
      setUnreadCount((prev) => Math.max(0, prev - 1));
    });

    return () => {
      console.log('Cleaning up socket event listeners');
      socket.off('notifications_list');
      socket.off('notification');
      socket.off('notification_updated');
      socket.off('notification_deleted');
    };
  }, [socket]);

  const markAsRead = async (notificationId: string) => {
    if (!socket) return;
    console.log('Marking notification as read:', notificationId);

    socket.emit('mark_notification_read', { notificationId });
    setNotifications((prev) => prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n)));
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = async () => {
    if (!socket) return;
    console.log('Marking all notifications as read');

    socket.emit('mark_all_notifications_read');
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const clearNotifications = () => {
    if (!socket) return;
    console.log('Clearing all notifications');

    socket.emit('clear_notifications');
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        clearNotifications,
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
