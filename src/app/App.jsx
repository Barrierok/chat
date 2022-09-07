import React from 'react';
import { Provider } from 'react-redux';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import './i18n';
import Home from '../features/home/Home';
import NoMatch from '../features/noMatch/NoMatch';
import Login from '../features/login/Login';
import AuthContext from '../features/auth/authContext';
import AuthenticatedRoute from '../common/components/routes/AuthenticatedRoute';
import IsNotAuthenticatedRoute from '../common/components/routes/IsNotAuthenticatedRoute';
import useAuth from '../features/auth/authHooks';
import store from './store';
import Signup from '../features/signup/Signup';

const App = () => {
  const auth = useAuth();

  return (
    <BrowserRouter>
      <AuthContext.Provider value={auth}>
        <Provider store={store}>
          <Switch>
            <AuthenticatedRoute exact path="/">
              <Home />
            </AuthenticatedRoute>
            <IsNotAuthenticatedRoute path="/login">
              <Login />
            </IsNotAuthenticatedRoute>
            <IsNotAuthenticatedRoute path="/signup">
              <Signup />
            </IsNotAuthenticatedRoute>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
