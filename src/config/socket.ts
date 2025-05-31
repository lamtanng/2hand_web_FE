import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8017/v1';

// Create a singleton socket instance
let socket: Socket | null = null;

export const initializeSocket = (token: string): Socket => {
  if (!socket) {
    console.log('Initializing socket connection to:', SOCKET_URL);

    socket = io(SOCKET_URL);

    // Add connection event handlers
    socket.on('connect', () => {
      console.log('Socket connected successfully');
      console.log('Socket ID:', socket?.id);
      console.log('Socket Auth Token:', token);
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      console.error('Connection details:', {
        url: SOCKET_URL,
        transport: socket?.io?.engine?.transport?.name,
        auth: socket?.auth,
      });
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected. Reason:', reason);
      // Attempt to reconnect if disconnected
      if (reason === 'io server disconnect') {
        console.log('Attempting to reconnect...');
        socket?.connect();
      }
    });

    // Debug all incoming events
    socket.onAny((eventName, ...args) => {
      console.log('Received event:', eventName, 'with data:', args);
    });
  }

  return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = (): void => {
  if (socket) {
    console.log('Disconnecting socket');
    socket.disconnect();
    socket = null;
  }
};
