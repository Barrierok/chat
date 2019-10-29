import React from 'react';
import { Field, SubmissionError } from 'redux-form';
import UsernameContext from '../UsernameContext';
import connect from '../connect';
import reduxForm from '../reduxForm';

const mapStateToProps = (state) => {
  const props = {
    activeChannel: state.channels.activeChannel,
  };
  return props;
};

@connect(mapStateToProps)
@reduxForm('newMessage')
class MessageForm extends React.PureComponent {
  handleSubmit = async (values) => {
    const { addMessage, reset, activeChannel } = this.props;
    const author = this.context;
    try {
      await addMessage({ author, activeChannel, ...values });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  }

  static contextType = UsernameContext;

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

export default MessageForm;
