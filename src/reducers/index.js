import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import channels from './channels';
import messages from './messages';

export default combineReducers({
  ...channels,
  ...messages,
  form: formReducer,
});
