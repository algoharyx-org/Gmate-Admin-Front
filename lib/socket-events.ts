import { getSocket } from './socket';
import { toast } from 'react-hot-toast';

export const initSocketEvents = () => {
  const socket = getSocket();

  socket.on('contact:new', (data) => {
    toast.success(`New message from ${data.name}`);
  });

  socket.on('connect', () => {
    console.log('✅ Connected');
  });

  socket.on('disconnect', () => {
    console.log('❌ Disconnected');
  });
};