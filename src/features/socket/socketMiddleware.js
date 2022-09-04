import { io } from 'socket.io-client';
import { connectionEstablished, startConnecting } from './socketSlice';
import { addMessage, sendMessage } from '../messages/messagesSlice';

const socketMiddleware = (store) => {
  let socket = null;

  return (next) => (action) => {
    const isConnectionEstablished = socket && store.getState().socket.isConnected;

    if (action.type === startConnecting.type) {
      socket = io();

      socket.on('connect', () => {
        store.dispatch(connectionEstablished());
      });

      socket.on('newMessage', (payload) => {
        store.dispatch(addMessage(payload));
      });
    } else if (isConnectionEstablished) {
      switch (action.type) {
        case sendMessage.type: {
          socket.emit('newMessage', action.payload);
          break;
        }
        default: {
          break;
        }
      }
    }

    next(action);
  };
};

export default socketMiddleware;
