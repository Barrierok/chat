/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({ currentChannelId: null }),
  reducers: {
    setChannels: channelsAdapter.setAll,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
});

export const {
  selectIds: selectChannelIds,
  selectById: selectChannelById,
} = channelsAdapter.getSelectors((state) => state.channels);

export const selectCurrentChannelId = (state) => state.channels.currentChannelId;

export const {
  actions: {
    setCurrentChannelId,
    setChannels,
  },
  reducer: channelsReducer,
} = channelsSlice;
