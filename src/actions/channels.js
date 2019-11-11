import axios from 'axios';
import { createAction } from 'redux-starter-kit';
import routes from '../routes';

export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');

export const setActiveChannel = createAction('ACTIVE_CHANNEL_SET');

export const renameChannel = ({ id, name }) => async (dispath) => {
  dispath(renameChannelRequest());
  try {
    const url = routes.channelPath(id);
    await axios.patch(url, { data: { attributes: { name } } });
  } catch (e) {
    dispath(renameChannelFailure());
    throw e;
  }
};

export const removeChannel = ({ id }) => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    const url = routes.channelPath(id);
    await axios.delete(url);
  } catch (e) {
    dispatch(removeChannelFailure());
    throw e;
  }
};

export const addChannel = ({ name }) => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    const url = routes.channelsPath();
    await axios.post(url, { data: { attributes: { name } } });
  } catch (e) {
    dispatch(addChannelFailure());
    throw e;
  }
};
