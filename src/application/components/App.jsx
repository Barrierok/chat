import React from 'react';
import cookies from 'js-cookie';
import Channels from './Channels.jsx';
import Chat from './Chat';
import MessageForm from './MessageForm.jsx';
import UsernameContext from './UsernameContext';

const App = () => (
  <main>
    <Channels />
    <Chat />
    <UsernameContext.Provider value={cookies.get('username')}>
      <MessageForm />
    </UsernameContext.Provider>
  </main>
);

export default App;
