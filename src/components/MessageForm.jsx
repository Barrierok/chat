import React from 'react';
import { Field, SubmissionError } from 'redux-form';
import { Button } from 'react-bootstrap';
import UsernameContext from '../utils/UsernameContext';
import connect from '../utils/connect';
import reduxForm from '../utils/reduxForm';

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
        <Button type="submit" variant="primary" className="btn-sm" disabled={pristine || submitting}>
          Send
        </Button>
        {error && <div className="ml-3">{error}</div>}
      </form>
    );
  }
}

export default MessageForm;
