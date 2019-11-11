import { createReducer } from 'redux-starter-kit';
import * as actions from '../actions';

const mappingActions = action => (
  createReducer('none', {
    [actions[`${action}Request`]]() {
      return 'requested';
    },
    [actions[`${action}Success`]]() {
      return 'finished';
    },
    [actions[`${action}Failure`]]() {
      return 'failed';
    },
  })
);

const messageAddingState = mappingActions('addMessage');
const channelAddingState = mappingActions('addChannel');
const channelRemovingState = mappingActions('removeChannel');
const channelRenamingState = mappingActions('renameChannel');

export default {
  messageAddingState,
  channelAddingState,
  channelRemovingState,
  channelRenamingState,
};
