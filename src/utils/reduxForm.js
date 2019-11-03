import { reduxForm } from 'redux-form';

export default name => Component => reduxForm({ form: `${name}`, enableReinitialize: true })(Component);
