import { channelsReducer } from '../features/channels/channelsSlice';
import { messagesReducer } from '../features/messages/messagesSlice';
import { socketReducer } from '../features/socket/socketSlice';

export default ({
  socket: socketReducer,
  channels: channelsReducer,
  messages: messagesReducer,
});
