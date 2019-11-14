import { createSlice } from 'redux-starter-kit';
import _ from 'lodash';
import axios from 'axios';

import { removeChannelSuccess } from '../channels/channelsSlice';
import routes from '../../routes';

const initialState = {
  byId: {},
  allIds: [],
};

const messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    initMessages: (state, { payload: { messages: initMessages } }) => {
      state.byId = _.keyBy(initMessages, 'id');
      state.allIds = initMessages.map(m => m.id);
    },
    addMessageSuccess: (state, { payload: { message } }) => {
      state.byId[message.id] = message;
      state.allIds.push(message.id);
    },
  },
  extraReducers: {
    [removeChannelSuccess]: (state, { payload: { channelId } }) => {
      state.byId = _.omitBy(state.byId, message => message.channelId === channelId);
      state.allIds = Object.keys(state.byId);
    },
  },
});

const { actions, reducer } = messages;

export const { initMessages, addMessageSuccess } = actions;

export const addMessage = ({ author, activeChannel, text }) => async () => {
  try {
    const url = routes.channelMessagesPath(activeChannel);
    await axios.post(url, { data: { attributes: { author, text } } });
  } catch (e) {
    throw e;
  }
};

export default reducer;
