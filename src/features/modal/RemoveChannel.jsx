import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import connect from '../../utils/connect';
import { removeChannel as rc } from '../channels/channelsSlice';
import { hideModal as hm } from './modalSlice';

@connect(null, { removeChannel: rc, hideModal: hm })
class ConfirmDelete extends React.Component {
  render() {
    const { hideModal } = this.props;
    const handleRemove = () => {
      const { id, removeChannel } = this.props;
      removeChannel({ id });
      hideModal();
    };

    return (
      <Modal
        size="sm"
        show
        onHide={hideModal}
        className="confirm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-around">
          <Button onClick={hideModal}>Close</Button>
          <Button variant="danger" onClick={handleRemove}>Delete</Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ConfirmDelete;
