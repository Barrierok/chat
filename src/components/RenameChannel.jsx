import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Field, SubmissionError } from 'redux-form';
import reduxForm from '../utils/reduxForm';
import connect from '../utils/connect';
import * as actions from '../actions';

const mapStateToProps = () => ({});

const actionCreators = {
  renameChannel: actions.renameChannel,
};

@connect(mapStateToProps, actionCreators)
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
      <form className="renameChannel" onSubmit={handleSubmit(this.handleSubmit)}>
        <Field name="text" required disabled={submitting} component="input" type="text" />
        {error && <div className="ml-3">{error}</div>}
        <Button type="submit" variant="success" disabled={pristine || submitting}>Rename</Button>
      </form>
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
