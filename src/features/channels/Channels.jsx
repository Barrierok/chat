import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Nav } from 'reactstrap';
import { selectChannelIds } from './channelsSlice';
import Channel from './Channel';
import AddModal from './AddModal';
import useModalState from '../../common/hooks/useModalState';

const Channels = () => {
  const channelsIds = useSelector(selectChannelIds);

  const { modal, toggle } = useModalState();

  return (
    <>
      <AddModal toggle={toggle} modal={modal} />
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        Каналы
        <Button onClick={toggle} outline className="btn-group-vertical p-1" color="primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg"
               viewBox="0 0 16 16">
            <path fillRule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
          </svg>
        </Button>
      </div>
      <Nav pills fill vertical className="px-2">
        {channelsIds.map((id) => <Channel key={id} id={id} />)}
      </Nav>
    </>
  );
};

export default Channels;
