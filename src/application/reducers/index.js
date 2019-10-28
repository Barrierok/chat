// import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messageAddingState = handleActions({
  [actions.addMessageRequest]() {
    return 'requested';
  },
  [actions.addMessageSuccess]() {
    return 'finished';
  },
  [actions.addMessageFailure]() {
    return 'failed';
  },
}, 'none');

const channelAddingState = handleActions({
  [actions.addChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelSuccess]() {
    return 'finished';
  },
  [actions.addChannelFailure]() {
    return 'failed';
  },
}, 'none');

const channels = handleActions({
  [actions.addChannelSuccess](state, { payload: { channel } }) {
    const { byId, allIds } = state;
    return {
      ...state,
      byId: { ...byId, [channel.id]: channel },
      allIds: [...allIds, channel.id],
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
  channelAddingState,
  messageAddingState,
  channels,
  messages,
  form: formReducer,
});
