import React from 'react';
import PropTypes from 'prop-types';
import { Container, Navbar } from 'reactstrap';
import cn from 'classnames';
import { Link } from 'react-router-dom';

const Template = ({ children, containerFluid, containerClassName }) => (
  <div className="d-flex flex-column h-100">
    <Navbar container className="shadow-sm" expand="lg" light color="white">
      <Link to="/" className="navbar-brand">Chat by Zubtsov</Link>
    </Navbar>
    <Container fluid={containerFluid} className={cn(containerClassName, 'flex-grow-1')}>
      {children}
    </Container>
  </div>
);

Template.propTypes = {
  containerClassName: PropTypes.string,
  containerFluid: PropTypes.bool,
  children: PropTypes.node,
};

export default Template;
