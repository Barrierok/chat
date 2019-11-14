import { combineReducers } from 'redux-starter-kit';
import channels from '../features/channels/channelsSlice';
import messages from '../features/messages/messagesSlice';

export default combineReducers({
  ...channels,
  ...messages,
});
