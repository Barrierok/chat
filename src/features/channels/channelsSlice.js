import { createSlice } from 'redux-starter-kit';
import _ from 'lodash';
import axios from 'axios';

import routes from '../../routes';

const initialState = {
  byId: {},
  allIds: [],
  activeChannel: null,
  generalId: null,
};

const channels = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    initChannels: (state, { payload: { channels: initChannels, currentChannelId } }) => {
      state.byId = _.keyBy(initChannels, 'id');
      state.allIds = initChannels.map(c => c.id);
      state.activeChannel = currentChannelId;
      state.generalId = currentChannelId;
    },
    setActiveChannel: (state, { payload: { activeChannel } }) => {
      state.activeChannel = activeChannel;
    },
    addChannelSuccess: (state, { payload: { channel } }) => {
      state.byId[channel.id] = channel;
      state.allIds.push(channel.id);
    },
    removeChannelSuccess: (state, { payload: { id } }) => {
      const { activeChannel, generalId } = state;
      state.activeChannel = (activeChannel === id ? generalId : activeChannel);
      state.byId = _.omitBy(state.byId, id);
      state.allIds = _.without(state.allIds, id);
    },
    renameChannelSuccess: (state, { payload: { channel } }) => {
      state.byId[channel.id] = channel;
    },
  },
});

const { actions, reducer } = channels;

export const {
  initChannels, addChannelSuccess, renameChannelSuccess, removeChannelSuccess, setActiveChannel,
} = actions;

export default reducer;

export const renameChannel = ({ id, name }) => async () => {
  try {
    const url = routes.channelPath(id);
    await axios.patch(url, { data: { attributes: { name } } });
  } catch (e) {
    throw e;
  }
};

export const removeChannel = ({ id }) => async () => {
  try {
    const url = routes.channelPath(id);
    await axios.delete(url);
  } catch (e) {
    throw e;
  }
};

export const addChannel = ({ name }) => async () => {
  try {
    const url = routes.channelsPath();
    await axios.post(url, { data: { attributes: { name } } });
  } catch (e) {
    throw e;
  }
};
