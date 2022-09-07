import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Navbar } from 'reactstrap';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthContext from '../../../features/auth/authContext';

const Template = ({ children, containerFluid, containerClassName }) => {
  const { user, logoutUser } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <Navbar container className="shadow-sm" expand="lg" light color="white">
        <Link to="/" className="navbar-brand">Hexlet Chat</Link>
        {user && <Button color="primary" onClick={logoutUser}>{t('template.logout')}</Button>}
      </Navbar>
      <Container fluid={containerFluid} className={cn(containerClassName, 'flex-grow-1')}>
        {children}
      </Container>
    </div>
  );
};

Template.propTypes = {
  containerClassName: PropTypes.string,
  containerFluid: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Template.defaultProps = {
  containerClassName: '',
  containerFluid: false,
};

export default Template;
