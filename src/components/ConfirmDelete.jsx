import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmDelete = (props) => {
  const { toggleConfirm, show } = props;

  const handleRemove = () => {
    const { removingId, removeChannel } = props;
    removeChannel({ id: removingId });
    toggleConfirm();
  };

  return (
    <Modal
      size="sm"
      show={show}
      onHide={toggleConfirm}
    >
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button onClick={toggleConfirm}>Close</Button>
        <Button variant="danger" onClick={handleRemove}>Delete</Button>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmDelete;
