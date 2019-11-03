import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import 'material-design-icons';
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

if (!cookies.get('username')) {
  const randomName = faker.name.findName();
  cookies.set('username', randomName);
}

const store = createStore(
  reducers,
  (ext
    ? compose(applyMiddleware(thunk), devtoolMiddleware)
    : applyMiddleware(thunk)),
);

const initValues = ({ channels, messages, currentChannelId }) => {
  channels.forEach(channel => (
    store.dispatch(actions.addChannelSuccess({ channel }))
  ));
  messages.forEach(message => (
    store.dispatch(actions.addMessageSuccess({ message }))
  ));
  store.dispatch(actions.setActiveChannel({ activeChannel: currentChannelId }));
};

initValues(gon);

io().on('newMessage', ({ data: { attributes } }) => {
  store.dispatch(actions.addMessageSuccess({ message: attributes }));
}).on('newChannel', ({ data: { attributes } }) => {
  store.dispatch(actions.addChannelSuccess({ channel: attributes }));
}).on('removeChannel', ({ data: { id } }) => {
  store.dispatch(actions.removeChannelSuccess({ id }));
}).on('renameChannel', ({ data: { attributes } }) => {
  store.dispatch(actions.renameChannelSuccess({ channel: attributes }));
});

ReactDOM.render(
  <Provider store={store}>
    <UsernameContext.Provider value={cookies.get('username')}>
      <App />
    </UsernameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
