import React from 'react';
import { useSelector } from 'react-redux';
import { Nav } from 'reactstrap';
import { selectChannelIds } from './channelsSlice';
import Channel from './Channel';

const Channels = () => {
  const channelsIds = useSelector(selectChannelIds);

  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        Каналы
      </div>
      <Nav pills fill vertical className="px-2">
        {channelsIds.map((id) => <Channel key={id} id={id} />)}
      </Nav>
    </>
  );
};

export default Channels;
