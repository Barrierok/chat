import React from 'react';
import { Formik, Field } from 'formik';
import {
  Button, Form, Row, Col,
} from 'react-bootstrap';
import UsernameContext from '../utils/UsernameContext';
import connect from '../utils/connect';

const mapStateToProps = (state) => {
  const props = {
    activeChannel: state.channels.activeChannel,
  };
  return props;
};

@connect(mapStateToProps)
class MessageForm extends React.PureComponent {
  handleSubmit = async (values, actions) => {
    const { addMessage, activeChannel } = this.props;
    const author = this.context;
    try {
      await addMessage({ author, activeChannel, ...values });
      actions.resetForm();
      actions.setSubmitting(false);
    } catch (e) {
      actions.setFieldError('text', e.message);
    }
  }

  static contextType = UsernameContext;

  render() {
    return (
      <Formik onSubmit={this.handleSubmit} initialValues={{ text: '' }}>
        {({ dirty, isSubmitting, handleSubmit }) => (
          <Form className="form d-flex justify-content-around w-100" onSubmit={handleSubmit}>
            <Row className="w-100">
              <Col sm={12} md={8} lg={10}>
                <Field name="text" required disabled={isSubmitting} type="text" className="rounded border w-100 mt-3" />
              </Col>
              <Col sm={12} md={4} lg={2}>
                <Button type="submit" variant="primary" className="w-100 mt-3" disabled={!dirty || isSubmitting}>
                  Send
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }
}

export default MessageForm;
