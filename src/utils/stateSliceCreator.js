import { createSlice } from 'redux-starter-kit';
import {
  addChannelActionName,
  removeChannelActionName,
  renameChannelActionName,
  addMessageActionName,
} from './actions';

const mappingNames = {
  [addChannelActionName]: 'channelAdding',
  [removeChannelActionName]: 'channelRemoving',
  [renameChannelActionName]: 'channelRenaming',
  [addMessageActionName]: 'messageAdding',
};

export default action => (
  createSlice({
    name: `${mappingNames[action]}State`,
    initialState: 'none',
    reducers: {
      request: () => 'requested',
      success: () => 'finished',
      failure: () => 'failed',
    },
  })
);
