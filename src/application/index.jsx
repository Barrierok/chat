import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import cookies from 'js-cookie';
import App from './components/App.jsx';
import reducers from './reducers';
import UsernameContext from './components/UsernameContext';
import * as actions from './actions';

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);

export default (gon) => {
  gon.channels.forEach(channel => (
    store.dispatch(actions.addChannelSuccess({ channel }))
  ));

  gon.messages.forEach(message => (
    store.dispatch(actions.addMessageSuccess({ message }))
  ));

  ReactDOM.render(
    <Provider store={store}>
      <UsernameContext.Provider value={cookies.get('username')}>
        <App />
      </UsernameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
