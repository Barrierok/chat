import { createSlice } from 'redux-starter-kit';
import _ from 'lodash';
import axios from 'axios';

import routes from '../../routes';
import createSliceState from '../../utils/stateSliceCreator';
import {
  addChannelActionName, renameChannelActionName, removeChannelActionName,
} from '../../utils/actions';

const channelAddingState = createSliceState(addChannelActionName);
const channelRemovingState = createSliceState(removeChannelActionName);
const channelRenamingState = createSliceState(renameChannelActionName);

export const {
  actions: { failure: addChannelFailure, success: addChannelSuccess, request: addChannelRequest },
} = channelAddingState;

export const {
  actions: {
    failure: removeChannelFailure,
    success: removeChannelSuccess,
    request: removeChannelRequest,
  },
} = channelRemovingState;

export const {
  actions: {
    failure: renameChannelFailure,
    success: renameChannelSuccess,
    request: renameChannelRequest,
  },
} = channelRenamingState;

const initialState = {
  byId: {},
  allIds: [],
  activeChannel: null,
  generalId: null,
};

const channels = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    initChannels: (state, { payload: { channels: initChannels, currentChannelId } }) => {
      const byId = initChannels.reduce((acc, c) => ({ ...acc, [c.id]: c }), {});
      const allIds = initChannels.map(c => c.id);
      return {
        ...state,
        byId,
        allIds,
        activeChannel: currentChannelId,
        generalId: currentChannelId,
      };
    },
    setActiveChannel: (state, { payload: { activeChannel } }) => ({
      ...state,
      activeChannel,
    }),
  },
  extraReducers: {
    [addChannelSuccess]: (state, { payload: { channel } }) => {
      const { byId, allIds } = state;
      return {
        ...state,
        byId: { ...byId, [channel.id]: channel },
        allIds: [...allIds, channel.id],
      };
    },
    [removeChannelSuccess]: (state, { payload: { id } }) => {
      const {
        byId,
        allIds,
        activeChannel,
        generalId,
      } = state;
      return {
        ...state,
        activeChannel: activeChannel === id ? generalId : activeChannel,
        byId: _.omitBy(byId, id),
        allIds: _.without(allIds, id),
      };
    },
    [renameChannelSuccess]: (state, { payload: { channel } }) => {
      const { byId } = state;
      return {
        ...state,
        byId: { ...byId, [channel.id]: channel },
      };
    },
  },
});

export const { setActiveChannel, initChannels } = channels.actions;

export default {
  channels: channels.reducer,
  channelAddingState: channelAddingState.reducer,
  channelRemovingState: channelRemovingState.reducer,
  channelRenamingState: channelRenamingState.reducer,
};

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
