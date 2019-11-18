/* eslint-disable no-param-reassign */
import { createSlice } from 'redux-starter-kit';
import _ from 'lodash';
import axios from 'axios';

import { removeChannelSuccess } from '../channels/channelsSlice';
import routes from '../../routes';

const initialState = {
  messages: [],
};

const messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    initMessages: (state, { payload: { messages: initMessages } }) => {
      state.messages = initMessages;
    },
    addMessageSuccess: (state, { payload: { message } }) => {
      state.messages.push(message);
    },
  },
  extraReducers: {
    [removeChannelSuccess]: (state, { payload: { id } }) => {
      _.remove(state.messages, (m => m.channelId === id));
    },
  },
});

const { actions, reducer } = messages;

export const { initMessages, addMessageSuccess } = actions;

export const addMessage = ({ author, activeChannel, text }) => async () => {
  const url = routes.channelMessagesPath(activeChannel);
  await axios.post(url, { data: { attributes: { author, text } } });
};

export default reducer;
