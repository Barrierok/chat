import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';

export default (channels) => {
  ReactDOM.render(
    <App channels={channels} />,
    document.getElementById('chat'),
  );
};
