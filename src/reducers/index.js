import _ from 'lodash';
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

const channelRemovingState = handleActions({
  [actions.removeChannelRequest]() {
    return 'requested';
  },
  [actions.removeChannelSuccess]() {
    return 'finished';
  },
  [actions.removeChannelFailure]() {
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
  [actions.setActiveChannel](state, { payload: { activeChannel } }) {
    return {
      ...state,
      activeChannel,
    };
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    const { byId, allIds } = state;
    return {
      activeChannel: 1,
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
  channels,
  messages,
  form: formReducer,
});
