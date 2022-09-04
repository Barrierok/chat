import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../../features/auth/authContext';

const AuthenticatedRoute = React.memo(({ children, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) => (user ? (
        children
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      ))}
    />
  );
});

AuthenticatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

AuthenticatedRoute.displayName = 'AuthenticatedRoute';

export default AuthenticatedRoute;
