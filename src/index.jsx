import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'redux-starter-kit';
import thunk from 'redux-thunk';
import io from 'socket.io-client';

import App from './components/App.jsx';
import reducers from './reducers';
import UsernameContext from './utils/UsernameContext';
import { initMessages, addMessageSuccess } from './features/messages/messagesSlice';
import {
  initChannels, addChannelSuccess, removeChannelSuccess, renameChannelSuccess,
} from './features/channels/channelsSlice';
import {
  addChannelActionName, removeChannelActionName, renameChannelActionName, addMessageActionName,
} from './utils/actions';

let username = cookies.get('username');
if (!username) {
  username = faker.name.findName();
  cookies.set('username', username);
}

const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

const initValues = ({ channels, currentChannelId, messages }) => {
  store.dispatch(initChannels({ channels, currentChannelId }));
  store.dispatch(initMessages({ messages }));
};
initValues(gon);


const mappingListener = (event, serverData) => {
  const mapping = {
    [addMessageActionName]: data => addMessageSuccess({ message: data }),
    [addChannelActionName]: data => addChannelSuccess({ channel: data }),
    [removeChannelActionName]: data => removeChannelSuccess({ id: data }),
    [renameChannelActionName]: data => renameChannelSuccess({ channel: data }),
  };
  return store.dispatch(mapping[event](serverData));
};

io()
  .on('newMessage', ({ data: { attributes } }) => mappingListener(addMessageActionName, attributes))
  .on('newChannel', ({ data: { attributes } }) => mappingListener(addChannelActionName, attributes))
  .on('removeChannel', ({ data: { id } }) => mappingListener(removeChannelActionName, id))
  .on('renameChannel', ({ data: { attributes } }) => mappingListener(renameChannelActionName, attributes));

ReactDOM.render(
  <Provider store={store}>
    <UsernameContext.Provider value={username}>
      <App />
    </UsernameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
