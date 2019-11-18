import React from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';

import connect from '../../utils/connect';
import { renameChannel as rc } from '../channels/channelsSlice';
import { hideModal as hm } from './modalSlice';

@connect(null, { renameChannel: rc, hideModal: hm })
class RenameChannel extends React.PureComponent {
  handleSubmit = async (values, actions) => {
    const { renameChannel, id, hideModal } = this.props;
    try {
      await renameChannel({ id, name: values.text });
      actions.setSubmitting(false);
      hideModal();
    } catch (e) {
      actions.setFieldError('text', e.message);
    }
  }

  renderForm = initialValues => (
    <Formik onSubmit={this.handleSubmit} initialValues={initialValues}>
      {({ dirty, isSubmitting, handleSubmit }) => (
        <Form className="d-flex" onSubmit={handleSubmit}>
          <Field name="text" required disabled={isSubmitting} component="input" type="text" className="w-100" />
          <ErrorMessage name="text" />
          <Button type="submit" variant="success" disabled={!dirty || isSubmitting}>Rename</Button>
        </Form>
      )}
    </Formik>
  );

  render() {
    const { initialValues, hideModal } = this.props;
    return (
      <Modal show onHide={hideModal}>
        <Modal.Header closeButton>Rename Channel</Modal.Header>
        <Modal.Body>
          {this.renderForm(initialValues)}
        </Modal.Body>
      </Modal>
    );
  }
}

export default RenameChannel;
