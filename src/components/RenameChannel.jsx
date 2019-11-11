import React from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { Field, SubmissionError } from 'redux-form';
import reduxForm from '../utils/reduxForm';
import connect from '../utils/connect';

const mapStateToProps = () => ({});

@connect(mapStateToProps)
@reduxForm('deleteChannel')
class deleteChannel extends React.PureComponent {
  handleSubmit = async (values) => {
    const { renameChannel, id, toggleRename } = this.props;
    try {
      await renameChannel({ id, name: values.text });
      toggleRename();
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  }

  renderForm = () => {
    const {
      handleSubmit,
      submitting,
      error,
      pristine,
    } = this.props;
    return (
      <Form className="d-flex" onSubmit={handleSubmit(this.handleSubmit)}>
        <Field name="text" required disabled={submitting} component="input" type="text" className="w-100" />
        {error && <div className="ml-3">{error}</div>}
        <Button type="submit" variant="success" disabled={pristine || submitting}>Rename</Button>
      </Form>
    );
  }

  render() {
    const { toggleRename, show } = this.props;
    return (
      <Modal show={show} onHide={toggleRename}>
        <Modal.Header closeButton>Rename Channel</Modal.Header>
        <Modal.Body>
          {this.renderForm()}
        </Modal.Body>
      </Modal>
    );
  }
}

export default deleteChannel;
