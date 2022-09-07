import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Nav } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { selectChannelIds } from './channelsSlice';
import Channel from './Channel';
import AddModal from './AddModal';
import { ReactComponent as AddIcon } from './icon.svg';
import useModalState from '../../common/hooks/useModalState';

const Channels = () => {
  const { t } = useTranslation();
  const channelsIds = useSelector(selectChannelIds);

  const { modal, toggle } = useModalState();

  return (
    <>
      <AddModal toggle={toggle} modal={modal} />
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        {t('channel.channels')}
        <Button onClick={toggle} outline className="btn-group-vertical p-1" color="primary">
          <AddIcon />
        </Button>
      </div>
      <Nav pills fill vertical className="px-2">
        {channelsIds.map((id) => <Channel key={id} id={id} />)}
      </Nav>
    </>
  );
};

export default Channels;
