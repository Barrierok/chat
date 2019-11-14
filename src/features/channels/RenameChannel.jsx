import React from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';

import connect from '../../utils/connect';
import { renameChannel as action } from './channelsSlice';

@connect(null, { renameChannel: action })
class RenameChannel extends React.PureComponent {
  handleSubmit = async (values, actions) => {
    const { renameChannel, id, toggleRename } = this.props;
    try {
      await renameChannel({ id, name: values.text });
      toggleRename();
      actions.setSubmitting(false);
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
    const { toggleRename, show, initialValues } = this.props;
    return (
      <Modal show={show} onHide={toggleRename}>
        <Modal.Header closeButton>Rename Channel</Modal.Header>
        <Modal.Body>
          {this.renderForm(initialValues)}
        </Modal.Body>
      </Modal>
    );
  }
}

export default RenameChannel;
