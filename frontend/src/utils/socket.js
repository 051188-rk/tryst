import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Create socket instance without auto-connect
export const socket = io(URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5
});

// Function to connect with fresh token
export const connectSocket = () => {
  const token = localStorage.getItem('token');
  if (token) {
    socket.auth = { token };
    socket.connect();
  }
};

// Function to disconnect socket
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};