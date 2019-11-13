import { combineReducers } from 'redux-starter-kit';
import channels from './channels';
import messages from './messages';
import states from './actionState';

export default combineReducers({
  channels,
  messages,
  ...states,
});
