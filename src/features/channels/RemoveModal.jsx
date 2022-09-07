import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { removeChannelTrigger } from './channelsSlice';

const RemoveModal = ({ modal, toggle, id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(removeChannelTrigger({ id }));
  }, [id]);

  return (
    <Modal centered isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {t('channel.remove')}
      </ModalHeader>
      <ModalBody>
        {t('channel.sure')}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          {t('common.cancel')}
        </Button>
        <Button color="danger" onClick={handleClick}>
          {t('common.remove')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

RemoveModal.propTypes = {
  id: PropTypes.number.isRequired,
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default RemoveModal;
