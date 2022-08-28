import React from 'react';

const AuthContext = React.createContext({
  user: null,
  loginUser: () => {},
  logoutUser: () => {},
});

export default AuthContext;
