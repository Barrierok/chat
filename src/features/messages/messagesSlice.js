import { createSlice } from 'redux-starter-kit';
import axios from 'axios';

import routes from '../../routes';
import createStateSlice from '../../utils/stateSliceCreator';
import { addMessageActionName } from '../../utils/actions';

const messageAddingState = createStateSlice(addMessageActionName);

export const {
  actions: { failure: addMessageFailure, success: addMessageSuccess, request: addMessageRequest },
} = messageAddingState;

const messages = createSlice({
  name: 'messages',
  initialState: { byId: {}, allIds: [] },
  reducers: {
    initMessages: (state, { payload: { messages: initMessages } }) => {
      const byId = initMessages.reduce((acc, m) => ({ ...acc, [m.id]: m }), {});
      const allIds = initMessages.map(m => m.id);
      return {
        ...state,
        byId,
        allIds,
      };
    },
  },
  extraReducers: {
    [addMessageSuccess]: (state, { payload: { message } }) => {
      const { byId, allIds } = state;
      return {
        byId: { ...byId, [message.id]: message },
        allIds: [...allIds, message.id],
      };
    },
  },
});

export const { initMessages } = messages.actions;

export const addMessage = ({ author, activeChannel, text }) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const url = routes.channelMessagesPath(activeChannel);
    await axios.post(url, { data: { attributes: { author, text } } });
  } catch (e) {
    dispatch(addMessageFailure());
    throw e;
  }
};

export default {
  messageAddingState: messageAddingState.reducer,
  messages: messages.reducer,
};
