import React from 'react';
import { Field, SubmissionError } from 'redux-form';
import reduxForm from '../utils/reduxForm';
import connect from '../utils/connect';
import * as actions from '../actions';

const mapStateToProps = () => ({});

const actionCreators = {
  addChannel: actions.addChannel,
};


@connect(mapStateToProps, actionCreators)
@reduxForm('newChannel')
class ChannelForm extends React.PureComponent {
  handleSubmit = async (values) => {
    const { addChannel, reset, closeForm } = this.props;
    try {
      await addChannel({ name: values.text });
      closeForm();
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  }

  render() {
    const {
      handleSubmit,
      submitting,
      error,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Field name="text" required disabled={submitting} component="input" type="text" />
        {error && <div className="ml-3">{error}</div>}
      </form>
    );
  }
}

export default ChannelForm;
