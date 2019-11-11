import { connect } from 'react-redux';
import mapDispatchToProps from '../actions';

export default mapStateToProps => Component => (
  connect(mapStateToProps, mapDispatchToProps)(Component)
);
