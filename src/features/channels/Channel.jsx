import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { NavItem, NavLink } from 'reactstrap';
import { selectChannelById, selectCurrentChannelId, setCurrentChannelId } from './channelsSlice';

const Channel = React.memo(({ id }) => {
  const dispatch = useDispatch();

  const currentChannelId = useSelector(selectCurrentChannelId);
  const channel = useSelector((state) => selectChannelById(state, id));

  const handleClick = useCallback((channelId) => () => {
    dispatch(setCurrentChannelId(channelId));
  }, []);

  return (
    <NavItem className="w-100">
      <NavLink
        href="#"
        className="text-start"
        active={currentChannelId === channel.id}
        onClick={handleClick(channel.id)}
      >
        # {channel.name}
      </NavLink>
    </NavItem>
  );
});

Channel.displayName = 'Channel';

Channel.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Channel;
