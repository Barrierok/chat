import { createAction } from 'redux-starter-kit';
import * as messages from './messages';
import * as channels from './channels';

const initialize = createAction('INITIALIZE');

export default {
  initialize,
  ...messages,
  ...channels,
};
