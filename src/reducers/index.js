import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const mappingActions = action => (
  handleActions({
    [actions[`${action}Request`]]() {
      return 'requested';
    },
    [actions[`${action}Success`]]() {
      return 'finished';
    },
    [actions[`${action}Failure`]]() {
      return 'failed';
    },
  }, 'none')
);

const messageAddingState = mappingActions('addMessage');
const channelAddingState = mappingActions('addChannel');
const channelRemovingState = mappingActions('removeChannel');
const channelRenamingState = mappingActions('renameChannel');

const channels = handleActions({
  [actions.addChannelSuccess](state, { payload: { channel } }) {
    const { byId, allIds } = state;
    return {
      ...state,
      byId: { ...byId, [channel.id]: channel },
      allIds: [...allIds, channel.id],
    };
  },
  [actions.setActiveChannel](state, { payload: { activeChannel } }) {
    return {
      ...state,
      activeChannel,
    };
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    const { byId, allIds, activeChannel } = state;
    return {
      activeChannel: activeChannel === id ? 1 : activeChannel,
      byId: _.omitBy(byId, id),
      allIds: _.without(allIds, id),
    };
  },
  [actions.renameChannelSuccess](state, { payload: { channel } }) {
    const { byId } = state;
    return {
      ...state,
      byId: { ...byId, [channel.id]: channel },
    };
  },
}, { byId: {}, allIds: [], activeChannel: 0 });

const messages = handleActions({
  [actions.addMessageSuccess](state, { payload: { message } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [message.id]: message },
      allIds: [...allIds, message.id],
    };
  },
}, { byId: {}, allIds: [] });

export default combineReducers({
  channelRemovingState,
  messageAddingState,
  channelAddingState,
  channelRenamingState,
  channels,
  messages,
  form: formReducer,
});
