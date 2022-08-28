import React, { useCallback, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../../features/auth/authContext';

const AuthenticatedRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);

  const render = useCallback(
    ({ location }) => (user ? (
      children
    ) : (
      <Redirect
        to={{ pathname: '/login', state: { from: location } }}
      />
    )),
    [user],
  );

  return (
    <Route {...rest} render={render} />
  );
};

AuthenticatedRoute.propTypes = {
  children: PropTypes.node,
};

export default AuthenticatedRoute;
