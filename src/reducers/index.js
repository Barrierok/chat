import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import channels from './channels';
import messages from './messages';
import states from './actionState';

export default combineReducers({
  channels,
  messages,
  ...states,
  form: formReducer,
});
