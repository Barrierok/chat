import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { selectChannelById } from '../channels/channelsSlice';

const MessagesHeader = ({ currentChannelId, messagesCount }) => {
  const { t } = useTranslation();
  const currentChannel = useSelector((state) => selectChannelById(state, currentChannelId));

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {currentChannel?.name}
        </b>
      </p>
      <span className="text-muted">
        {t('messageForm.message', { count: messagesCount })}
      </span>
    </div>
  );
};

MessagesHeader.propTypes = {
  messagesCount: PropTypes.number.isRequired,
  currentChannelId: PropTypes.number.isRequired,
};

export default MessagesHeader;
