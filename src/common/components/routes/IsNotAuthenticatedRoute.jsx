import React, { useContext } from 'react';
import {
  Redirect,
  Route,
  useLocation,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../../features/auth/authContext';

const IsNotAuthenticatedRoute = React.memo(({ children, ...rest }) => {
  const { user } = useContext(AuthContext);

  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  return (
    <Route {...rest} render={!user ? children : <Redirect to={from} />} />
  );
});

IsNotAuthenticatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

IsNotAuthenticatedRoute.displayName = 'IsNotAuthenticatedRoute';

export default IsNotAuthenticatedRoute;
