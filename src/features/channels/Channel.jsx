import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
  UncontrolledDropdown,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { selectChannelById, selectCurrentChannelId, setCurrentChannelId } from './channelsSlice';
import ChannelButton from './ChannelButton';
import useModalState from '../../common/hooks/useModalState';
import RemoveModal from './RemoveModal';
import RenameModal from './RenameModal';

const Channel = React.memo(({ id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentChannelId = useSelector(selectCurrentChannelId);
  const channel = useSelector((state) => selectChannelById(state, id));

  const handleClick = useCallback((channelId) => () => {
    dispatch(setCurrentChannelId(channelId));
  }, [dispatch]);

  const { toggle: toggleRemove, modal: modalRemove } = useModalState();
  const { toggle: toggleRename, modal: modalRename } = useModalState();

  return (
    <>
      <RemoveModal
        id={id}
        toggle={toggleRemove}
        modal={modalRemove}
      />
      <RenameModal
        name={channel.name}
        toggle={toggleRename}
        id={channel.id}
        modal={modalRename}
      />
      <NavItem className="w-100 mb-1">
        {!channel.removable ? (
          <ChannelButton
            id={channel.id}
            currentChannelId={currentChannelId}
            name={channel.name}
            handleClick={handleClick}
          />
        ) : (
          <UncontrolledDropdown group className="w-100">
            <ChannelButton
              id={channel.id}
              currentChannelId={currentChannelId}
              name={channel.name}
              handleClick={handleClick}
            />
            <DropdownToggle caret color={currentChannelId === channel.id ? 'primary' : 'light'} />
            <DropdownMenu>
              <DropdownItem onClick={toggleRemove}>
                {t('common.remove')}
              </DropdownItem>
              <DropdownItem onClick={toggleRename}>
                {t('common.rename')}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )}
      </NavItem>
    </>
  );
});

Channel.displayName = 'Channel';

Channel.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Channel;
