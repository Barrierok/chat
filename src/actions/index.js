import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const addMessage = ({ author, activeChannel, text }) => async (dispatch) => {
  dispatch(addMessageRequest);
  try {
    const url = routes.channelMessagesPath(activeChannel);
    await axios.post(url, { data: { attributes: { author, text } } });
  } catch (e) {
    dispatch(addMessageFailure());
    throw e;
  }
};
