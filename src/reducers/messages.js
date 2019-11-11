import _ from 'lodash';
import { createReducer } from 'redux-starter-kit';
import actions from '../actions';

const messages = createReducer({ byId: {}, allIds: [] }, {
  [actions.initialize](state, { payload: { messages: initMessages } }) {
    const byId = initMessages.reduce((acc, m) => ({ ...acc, [m.id]: m }), {});
    const allIds = initMessages.map(m => m.id);
    return {
      ...state,
      byId,
      allIds,
    };
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    const { byId } = state;
    const newById = _.omitBy(byId, message => message.channelId === id);
    return {
      ...state,
      byId: newById,
      allIds: Object.keys(newById),
    };
  },
  [actions.addMessageSuccess](state, { payload: { message } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [message.id]: message },
      allIds: [...allIds, message.id],
    };
  },
});

export default messages;
