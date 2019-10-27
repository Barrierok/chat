// import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannelSuccess](state, { payload: { channel } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [channel.id]: channel },
      allIds: [...allIds, channel.id],
      activeChannel: channel.id,
    };
  },
  [actions.setStartChannels](state, { payload: { startChannels } }) {
    const { byId, allIds } = state;
    const channelsById = startChannels.reduce((acc, c) => ({ ...acc, [c.id]: c }), {});
    const channelsId = startChannels.map(c => c.id);
    return {
      ...state,
      byId: { ...byId, ...channelsById },
      allIds: [...allIds, ...channelsId],
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
  channels,
  messages,
  form: formReducer,
});
