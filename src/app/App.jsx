import React from 'react';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary, RollbarContext } from '@rollbar/react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const rollbarConfig = {
  accessToken: 'efed73eceb22424cbbb84d88310cd264',
  environment: 'production',
};

const App = () => {
  const auth = useAuth();

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <AuthContext.Provider value={auth}>
            <Provider store={store}>
              <Switch>
                <AuthenticatedRoute exact path="/">
                  <RollbarContext context="/">
                    <Home />
                  </RollbarContext>
                </AuthenticatedRoute>
                <IsNotAuthenticatedRoute path="/login">
                  <RollbarContext context="/login">
                    <Login />
                  </RollbarContext>
                </IsNotAuthenticatedRoute>
                <IsNotAuthenticatedRoute path="/signup">
                  <RollbarContext context="/signup">
                    <Signup />
                  </RollbarContext>
                </IsNotAuthenticatedRoute>
                <Route path="*">
                  <NoMatch />
                </Route>
              </Switch>
            </Provider>
          </AuthContext.Provider>
        </BrowserRouter>
        <ToastContainer
          theme="colored"
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
