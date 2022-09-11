import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
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
import i18n from '../../app/i18n';

const socketMiddleware = (store) => {
  // eslint-disable-next-line functional/no-let
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
            toast.success(i18n.t('toasts.createSuccess'));
          });
          break;
        }
        case removeChannelTrigger.type: {
          socket.emit('removeChannel', action.payload, () => {
            toast.success(i18n.t('toasts.removeSuccess'));
          });
          break;
        }
        case updateChannelTrigger.type: {
          socket.emit('renameChannel', action.payload, () => {
            toast.success(i18n.t('toasts.renameSuccess'));
          });
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
