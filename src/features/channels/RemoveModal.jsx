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
import { removeChannelTrigger } from './channelsSlice';

const RemoveModal = ({ modal, toggle, id }) => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(removeChannelTrigger({ id }));
  }, [id]);

  return (
    <Modal centered isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Добавить канал
      </ModalHeader>
      <ModalBody>
        Уверены?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Отменить
        </Button>
        <Button color="danger" onClick={handleClick}>
          Удалить
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
