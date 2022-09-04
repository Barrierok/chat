/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    isConnected: false,
    isEstablishingConnection: false,
  },
  reducers: {
    startConnecting: (state) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: ((state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    }),
  },
});

export const {
  actions: {
    startConnecting,
    connectionEstablished,
  },
  reducer: socketReducer,
} = socketSlice;
