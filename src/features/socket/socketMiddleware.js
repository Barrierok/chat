import { io } from 'socket.io-client';
import { connectionEstablished, startConnecting } from './socketSlice';
import {
  addMessage,
  removeMessages,
  selectMessagesIdsByChannel,
  sendMessage,
} from '../messages/messagesSlice';
import {
  addChannel,
  createChannel,
  removeChannel,
  removeChannelTrigger,
  selectCurrentChannelId,
  setCurrentChannelId,
  updateChannel,
  updateChannelTrigger,
} from '../channels/channelsSlice';

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

      socket.on('newChannel', (payload) => {
        store.dispatch(addChannel(payload));
      });

      socket.on('removeChannel', (payload) => {
        const messagesIds = selectMessagesIdsByChannel(store.getState(), payload.id);
        const currentChannelId = selectCurrentChannelId(store.getState());

        if (currentChannelId === payload.id) {
          store.dispatch(setCurrentChannelId(1));
        }

        store.dispatch(removeChannel(payload.id));
        store.dispatch(removeMessages(messagesIds));
      });

      socket.on('renameChannel', ({ id, ...changes }) => {
        store.dispatch(updateChannel({ id, changes }));
      });
    } else if (isConnectionEstablished) {
      switch (action.type) {
        case sendMessage.type: {
          socket.emit('newMessage', action.payload);
          break;
        }
        case createChannel.type: {
          socket.emit('newChannel', action.payload, (response) => {
            store.dispatch(setCurrentChannelId(response.data.id));
          });
          break;
        }
        case removeChannelTrigger.type: {
          socket.emit('removeChannel', action.payload);
          break;
        }
        case updateChannelTrigger.type: {
          socket.emit('renameChannel', action.payload);
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
