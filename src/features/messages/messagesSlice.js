import {
  createAction,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

const slice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    removeMessages: messagesAdapter.removeMany,
    setMessages: messagesAdapter.setAll,
    addMessage: messagesAdapter.addOne,
  },
});

export const {
  selectAll,
  selectById: selectMessageById,
} = messagesAdapter.getSelectors((state) => state.messages);

export const selectMessagesIdsByChannel = createSelector(
  [(state, channelId) => channelId, selectAll],
  (channelId, allMessages) => allMessages
    .filter((m) => m.channelId === channelId)
    .map((m) => m.id),
);

export const sendMessage = createAction('messages/sendMessage');
export const {
  actions: {
    removeMessages,
    setMessages,
    addMessage,
  },
  reducer: messagesReducer,
} = slice;
