import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const props = {
    activeChannel: state.channels.activeChannel,
  };
  return props;
};

const actionCreators = {
  addMessage: actions.addMessage,
};

class MessageForm extends React.PureComponent {
  handleSubmit = async (values) => {
    const { addMessage, reset, activeChannel } = this.props;
    try {
      await addMessage({ ...values, activeChannel });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  }

  render() {
    const {
      handleSubmit,
      submitting,
      pristine,
      error,
    } = this.props;
    return (
      <form className="form-inline" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group mx-3">
          <Field name="text" required disabled={submitting} component="input" type="text" />
        </div>
        <input type="submit" disabled={pristine || submitting} className="btn btn-primary btn-sm" value="Input message" />
        {error && <div className="ml-3">{error}</div>}
      </form>
    );
  }
}

const ConnectedForm = connect(mapStateToProps, actionCreators)(MessageForm);
export default reduxForm({
  form: 'newMessage',
})(ConnectedForm);
