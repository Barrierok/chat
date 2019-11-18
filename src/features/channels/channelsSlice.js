/* eslint-disable no-param-reassign */
import { createSlice } from 'redux-starter-kit';
import _ from 'lodash';
import axios from 'axios';

import routes from '../../routes';

const initialState = {
  channels: [],
  activeChannel: null,
  generalId: null,
};

const channels = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    initChannels: (state, { payload: { channels: initChannels, currentChannelId } }) => {
      state.channels = initChannels;
      state.activeChannel = currentChannelId;
      state.generalId = currentChannelId;
    },
    setActiveChannel: (state, { payload: { activeChannel } }) => {
      state.activeChannel = activeChannel;
    },
    addChannelSuccess: (state, { payload: { channel } }) => {
      state.channels.push(channel);
    },
    removeChannelSuccess: (state, { payload: { id } }) => {
      const { activeChannel, generalId } = state;
      state.activeChannel = (activeChannel === id ? generalId : activeChannel);
      _.remove(state.channels, (c => c.id === id));
    },
    renameChannelSuccess: (state, { payload: { channel } }) => {
      const index = state.channels.findIndex(c => c.id === channel.id);
      state.channels[index] = channel;
    },
  },
});

const { actions, reducer } = channels;

export const {
  initChannels, addChannelSuccess, renameChannelSuccess, removeChannelSuccess, setActiveChannel,
} = actions;

export default reducer;

export const renameChannel = ({ id, name }) => async () => {
  const url = routes.channelPath(id);
  await axios.patch(url, { data: { attributes: { name } } });
};

export const removeChannel = ({ id }) => async () => {
  const url = routes.channelPath(id);
  await axios.delete(url);
};

export const addChannel = ({ name }) => async () => {
  const url = routes.channelsPath();
  await axios.post(url, { data: { attributes: { name } } });
};
