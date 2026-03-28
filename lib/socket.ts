import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io('http://localhost:4000', {
      auth: {
        token: Cookies.get('accessToken'),
      },
    });
  }
  return socket;
};