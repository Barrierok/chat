import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import io from 'socket.io-client';
import App from './components/App.jsx';
import reducers from './reducers';
import UsernameContext from './utils/UsernameContext';
import * as actions from './actions';

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const username = cookies.get('username');
if (!username) {
  const randomName = faker.name.findName();
  cookies.set('username', randomName);
}

const store = createStore(
  reducers,
  (ext
    ? compose(applyMiddleware(thunk), devtoolMiddleware)
    : applyMiddleware(thunk)),
);

const initValues = values => (
  store.dispatch(actions.initialize(values))
);
initValues(gon);

const mappingListener = (event, serverData) => {
  const mapping = {
    newMessage: data => actions.addMessageSuccess({ message: data }),
    newChannel: data => actions.addChannelSuccess({ channel: data }),
    removeChannel: data => actions.removeChannelSuccess({ id: data }),
    renameChannel: data => actions.renameChannelSuccess({ channel: data }),
  };
  return store.dispatch(mapping[event](serverData));
};

io()
  .on('newMessage', ({ data: { attributes } }) => mappingListener('newMessage', attributes))
  .on('newChannel', ({ data: { attributes } }) => mappingListener('newChannel', attributes))
  .on('removeChannel', ({ data: { id } }) => mappingListener('removeChannel', id))
  .on('renameChannel', ({ data: { attributes } }) => mappingListener('renameChannel', attributes));

ReactDOM.render(
  <Provider store={store}>
    <UsernameContext.Provider value={username}>
      <App />
    </UsernameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
