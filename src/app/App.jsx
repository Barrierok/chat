import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Home from '../features/home/Home';
import NoMatch from '../features/noMatch/NoMatch';
import Login from '../features/login/Login';
import AuthContext from '../features/auth/authContext';
import AuthenticatedRoute from '../common/components/routes/AuthenticatedRoute';
import IsNotAuthenticatedRoute from '../common/components/routes/IsNotAuthenticatedRoute';
import useAuth from '../features/auth/authHooks';

const App = () => {
  const auth = useAuth();

  return (
    <BrowserRouter>
      <AuthContext.Provider value={auth}>
        <Switch>
          <AuthenticatedRoute exact path="/">
            <Home/>
          </AuthenticatedRoute>
          <IsNotAuthenticatedRoute path="/login">
            <Login/>
          </IsNotAuthenticatedRoute>
          <Route path="*">
            <NoMatch/>
          </Route>
        </Switch>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
