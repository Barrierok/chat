import _ from 'lodash';
import { createReducer } from 'redux-starter-kit';
import actions from '../actions';

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

const channelAddingState = mappingActions('addChannel');
const channelRemovingState = mappingActions('removeChannel');
const channelRenamingState = mappingActions('renameChannel');

const channels = createReducer({
  byId: {},
  allIds: [],
  activeChannel: null,
  generalId: null,
}, {
  [actions.initialize](state, { payload: { channels: initChannels, currentChannelId } }) {
    const byId = initChannels.reduce((acc, c) => ({ ...acc, [c.id]: c }), {});
    const allIds = initChannels.map(c => c.id);
    return {
      ...state,
      byId,
      allIds,
      activeChannel: currentChannelId,
      generalId: currentChannelId,
    };
  },
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
    const {
      byId,
      allIds,
      activeChannel,
      generalId,
    } = state;
    return {
      ...state,
      activeChannel: activeChannel === id ? generalId : activeChannel,
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
});

export default {
  channels,
  channelRenamingState,
  channelRemovingState,
  channelAddingState,
};
