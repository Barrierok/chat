import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const ChannelButton = ({
  currentChannelId, name, id, handleClick,
}) => (
  <Button
    block
    color={currentChannelId === id ? 'primary' : 'light'}
    className="text-start text-truncate"
    onClick={handleClick(id)}
  >
    <span className="me-1"># </span>
    {name}
  </Button>
);

ChannelButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  currentChannelId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default ChannelButton;
