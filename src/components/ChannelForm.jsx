import React from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import connect from '../utils/connect';

const mapStateToProps = () => ({});

@connect(mapStateToProps)
class ChannelForm extends React.PureComponent {
  handleSubmit = async (values, actions) => {
    const { addChannel, closeForm } = this.props;
    actions.resetForm();
    closeForm();
    try {
      await addChannel({ name: values.text });
      actions.setSubmitting(false);
    } catch (e) {
      actions.setFieldError('text', e.message);
    }
  }

  render() {
    return (
      <Formik initialValues={{ text: '' }} onSubmit={this.handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="channelForm w-100">
            <Field name="text" required disabled={isSubmitting} type="text" className="w-100" />
            <ErrorMessage name="text" />
          </Form>
        )}
      </Formik>
    );
  }
}

export default ChannelForm;
