import { combineReducers } from 'redux-starter-kit';
import channels from '../features/channels/channelsSlice';
import messages from '../features/messages/messagesSlice';
import modal from '../features/modal/modalSlice';

export default combineReducers({
  channels,
  messages,
  modal,
});
