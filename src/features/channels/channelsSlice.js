/* eslint-disable no-param-reassign */
import { createAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({ currentChannelId: null }),
  reducers: {
    updateChannel: channelsAdapter.updateOne,
    setChannels: channelsAdapter.setAll,
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
});

export const {
  selectAll: selectAllChannels,
  selectIds: selectChannelIds,
  selectById: selectChannelById,
} = channelsAdapter.getSelectors((state) => state.channels);

export const selectCurrentChannelId = (state) => state.channels.currentChannelId;

export const createChannel = createAction('channels/createChannel');
export const removeChannelTrigger = createAction('channels/removeChannelTrigger');
export const updateChannelTrigger = createAction('channels/updateChannelTrigger');
export const {
  actions: {
    updateChannel,
    removeChannel,
    addChannel,
    setCurrentChannelId,
    setChannels,
  },
  reducer: channelsReducer,
} = channelsSlice;
