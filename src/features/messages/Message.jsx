import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectMessageById } from './messagesSlice';

const Message = ({ id }) => {
  const message = useSelector((state) => selectMessageById(state, id));

  return (
    <div className="text-break mb-2">
      <b>{message.username}</b>: {message.body}
    </div>
  );
};

Message.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Message;
