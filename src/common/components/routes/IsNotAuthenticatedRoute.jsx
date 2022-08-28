import React, { useCallback, useContext } from 'react';
import {
  Redirect,
  Route,
  useLocation,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../../features/auth/authContext';

const IsNotAuthenticatedRoute = ({ children, ...rest }) => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const { user } = useContext(AuthContext);

  const renderContent = useCallback(
    () => (!user ? children : <Redirect to={from} />),
    [user],
  );

  return (
    <Route {...rest} render={renderContent} />
  );
};

IsNotAuthenticatedRoute.propTypes = {
  children: PropTypes.node,
};

export default IsNotAuthenticatedRoute;
