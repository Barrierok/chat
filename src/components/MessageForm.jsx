import React from 'react';
import { Field, SubmissionError } from 'redux-form';
import {
  Button, Form, Row, Col,
} from 'react-bootstrap';
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
      <Form className="form d-flex justify-content-around w-100" onSubmit={handleSubmit(this.handleSubmit)}>
        <Row className="w-100">
          <Col sm={12} md={8} lg={10}>
            <Field name="text" required disabled={submitting} component="input" type="text" className="rounded border w-100 mt-3" />
            {error && <div className="ml-3">{error}</div>}
          </Col>
          <Col sm={12} md={4} lg={2}>
            <Button type="submit" variant="primary" className="w-100 mt-3" disabled={pristine || submitting}>
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default MessageForm;
